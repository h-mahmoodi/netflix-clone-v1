import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "@src/types/movie";
import { RootState } from "../store";
import { addToast } from "../toast-slice";

type WatchListState = {
  movies: Movie[];
  loading: number[];
  error: string | null;
};

const initialState: WatchListState = {
  movies: [],
  loading: [],
  error: null,
};

export const addToWatchList = createAsyncThunk<
  Movie,
  Movie,
  { rejectValue: { id: number; error: string } }
>("watchList/add", async (movie: Movie, { dispatch, rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const watchList = JSON.parse(localStorage.getItem("watch-list") || "[]");
    const newWatchList = [...watchList, movie];
    localStorage.setItem("watch-list", JSON.stringify(newWatchList));
    dispatch(addToast(`${movie.title || movie.name} Added to Watch List`));
    return movie;
  } catch (error) {
    return rejectWithValue({
      id: movie.id,
      error:
        error instanceof Error ? error.message : "Error adding to watch list",
    });
  }
});

export const removeFromWatchList = createAsyncThunk<
  number,
  Movie,
  { rejectValue: string }
>("watchList/remove", async (movie: Movie, { dispatch, rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const watchList = JSON.parse(localStorage.getItem("watch-list") || "[]");
    const newWatchList = watchList.filter(
      (item: Movie) => item.id !== movie.id
    );
    localStorage.setItem("watch-list", JSON.stringify(newWatchList));
    dispatch(addToast(`${movie.title || movie.name} Removed from Watch List`));
    return movie.id;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Error removing from watch list"
    );
  }
});

const watchListSlice = createSlice({
  name: "watchList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToWatchList.pending, (state, action) => {
        state.loading.push(action.meta.arg.id);
        state.error = null;
      })
      .addCase(
        addToWatchList.fulfilled,
        (state, action: PayloadAction<Movie>) => {
          state.loading = state.loading.filter(
            (id) => id !== action.payload.id
          );
          state.movies.push(action.payload);
          state.error = null;
        }
      )
      .addCase(addToWatchList.rejected, (state, action) => {
        if (action.payload) {
          const { id, error } = action.payload;
          state.loading = state.loading.filter((loadingId) => loadingId !== id);
          state.error = error;
        }
      });

    builder
      .addCase(removeFromWatchList.pending, (state, action) => {
        state.loading.push(action.meta.arg.id);
        state.error = null;
      })
      .addCase(
        removeFromWatchList.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = state.loading.filter((id) => id !== action.payload); // Remove from loading

          state.movies = state.movies.filter(
            (movie) => movie.id !== action.payload
          );

          state.error = null;
        }
      )
      .addCase(removeFromWatchList.rejected, (state, action) => {
        const movieId = action.meta.arg.id;
        state.loading = state.loading.filter((id) => id !== movieId); // Remove from loading
        state.error =
          action.payload || "Failed to remove movie from watch list";
      });
  },
});

export const selectWatchList = (state: RootState) => state.watchList;
export const watchListReducer = watchListSlice.reducer;
