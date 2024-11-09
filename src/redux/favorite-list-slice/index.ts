import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "@src/types/movie";
import { RootState } from "../store";
import { addToast } from "../toast-slice";

type FavoriteListState = {
  movies: Movie[];
  loading: number[];
  error: string | null;
};

const initialState: FavoriteListState = {
  movies: [],
  loading: [],
  error: null,
};

export const addToFavoriteList = createAsyncThunk<
  Movie,
  Movie,
  { rejectValue: { id: number; error: string } }
>("favoriteList/add", async (movie: Movie, { dispatch, rejectWithValue }) => {
  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const favoriteList = JSON.parse(
      localStorage.getItem("favorite-list") || "[]"
    );
    const newFavoriteList = [...favoriteList, movie];
    localStorage.setItem("favorite-list", JSON.stringify(newFavoriteList));
    dispatch(addToast(`${movie.title || movie.name} Added to Favorites`));
    return movie;
  } catch (error) {
    return rejectWithValue({
      id: movie.id,
      error:
        error instanceof Error
          ? error.message
          : "Error adding to favorite list",
    });
  }
});

export const removeFromFavoriteList = createAsyncThunk<
  number,
  Movie,
  { rejectValue: string }
>(
  "favoriteList/remove",
  async (movie: Movie, { dispatch, rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const favoriteList = JSON.parse(
        localStorage.getItem("favorite-list") || "[]"
      );
      const newFavoriteList = favoriteList.filter(
        (item: Movie) => item.id !== movie.id
      );
      localStorage.setItem("favorite-list", JSON.stringify(newFavoriteList));
      dispatch(addToast(`${movie.title || movie.name} Removed from Favorites`));
      return movie.id;
    } catch (error) {
      return rejectWithValue(
        error instanceof Error
          ? error.message
          : "Error removing from favorite list"
      );
    }
  }
);

const favoriteListSlice = createSlice({
  name: "favoriteList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToFavoriteList.pending, (state, action) => {
        state.loading.push(action.meta.arg.id);
        state.error = null;
      })
      .addCase(
        addToFavoriteList.fulfilled,
        (state, action: PayloadAction<Movie>) => {
          state.loading = state.loading.filter(
            (id) => id !== action.payload.id
          );
          state.movies.push(action.payload);
          state.error = null;
        }
      )
      .addCase(addToFavoriteList.rejected, (state, action) => {
        if (action.payload) {
          const { id, error } = action.payload;
          state.loading = state.loading.filter((loadingId) => loadingId !== id);
          state.error = error;
        }
      });

    builder
      .addCase(removeFromFavoriteList.pending, (state, action) => {
        state.loading.push(action.meta.arg.id);
        state.error = null;
      })
      .addCase(
        removeFromFavoriteList.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.loading = state.loading.filter((id) => id !== action.payload); // Remove from loading

          state.movies = state.movies.filter(
            (movie) => movie.id !== action.payload
          );

          state.error = null;
        }
      )
      .addCase(removeFromFavoriteList.rejected, (state, action) => {
        const movieId = action.meta.arg.id;
        state.loading = state.loading.filter((id) => id !== movieId); // Remove from loading
        state.error =
          action.payload || "Failed to remove movie from watch list";
      });
  },
});

export const selectFavoriteList = (state: RootState) => state.favoriteList;
export const favoriteListReducer = favoriteListSlice.reducer;
