import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Movie } from "@src/types/movie";
import { RootState } from "../store";

type RecentListState = {
  movies: Movie[];
  loading: number[];
  error: string | null;
};

const initialState: RecentListState = {
  movies: JSON.parse(localStorage.getItem("recent-list") || "[]"),
  loading: [],
  error: null,
};

export const addToRecentList = createAsyncThunk<Movie, Movie, { rejectValue: { id: number; error: string } }>(
  "recentList/add",
  async (movie: Movie, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const recentList = JSON.parse(localStorage.getItem("recent-list") || "[]");
      const newRecentList = [...recentList, movie];
      localStorage.setItem("recent-list", JSON.stringify(newRecentList));
      return movie;
    } catch (error) {
      return rejectWithValue({
        id: movie.id,
        error: error instanceof Error ? error.message : "Error adding to recent list",
      });
    }
  }
);

export const removeFromRecentList = createAsyncThunk<number, Movie, { rejectValue: string }>(
  "recentList/remove",
  async (movie: Movie, { rejectWithValue }) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const recentList = JSON.parse(localStorage.getItem("recent-list") || "[]");
      const newRecentList = recentList.filter((item: Movie) => item.id !== movie.id);
      localStorage.setItem("recent-list", JSON.stringify(newRecentList));
      return movie.id;
    } catch (error) {
      return rejectWithValue(error instanceof Error ? error.message : "Error removing from Recent List");
    }
  }
);

const recentListSlice = createSlice({
  name: "recentList",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToRecentList.pending, (state, action) => {
        state.loading.push(action.meta.arg.id);
        state.error = null;
      })
      .addCase(addToRecentList.fulfilled, (state, action: PayloadAction<Movie>) => {
        state.loading = state.loading.filter((id) => id !== action.payload.id);
        state.movies.push(action.payload);
        state.error = null;
      })
      .addCase(addToRecentList.rejected, (state, action) => {
        if (action.payload) {
          const { id, error } = action.payload;
          state.loading = state.loading.filter((loadingId) => loadingId !== id);
          state.error = error;
        }
      });

    builder
      .addCase(removeFromRecentList.pending, (state, action) => {
        state.loading.push(action.meta.arg.id);
        state.error = null;
      })
      .addCase(removeFromRecentList.fulfilled, (state, action: PayloadAction<number>) => {
        state.loading = state.loading.filter((id) => id !== action.payload);
        state.movies = state.movies.filter((movie) => movie.id !== action.payload);
        state.error = null;
      })
      .addCase(removeFromRecentList.rejected, (state, action) => {
        const movieId = action.meta.arg.id;
        state.loading = state.loading.filter((id) => id !== movieId);
        state.error = action.payload || "Failed to remove movie from Recent list";
      });
  },
});

export const selectRecentList = (state: RootState) => state.recentList;
export const recentListReducer = recentListSlice.reducer;
