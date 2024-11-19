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

export const addToRecentList = createAsyncThunk<
  Movie[],
  Movie,
  { rejectValue: { id: number; error: string } }
>("recentList/add", async (movie: Movie, { rejectWithValue }) => {
  try {
    const recentList: Movie[] = JSON.parse(localStorage.getItem("recent-list") || "[]");
    const isExist = recentList.find((item) => item.id === movie.id);
    console.log(isExist);
    const newRecentList = isExist ? [...recentList] : [...recentList, movie];
    console.log(newRecentList);
    localStorage.setItem("recent-list", JSON.stringify(newRecentList));
    return newRecentList;
  } catch (error) {
    return rejectWithValue({
      id: movie.id,
      error: error instanceof Error ? error.message : "Error adding to recent list",
    });
  }
});

export const removeFromRecentList = createAsyncThunk<number, Movie, { rejectValue: string }>(
  "recentList/remove",
  async (movie: Movie, { rejectWithValue }) => {
    try {
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
    builder.addCase(addToRecentList.fulfilled, (state, action: PayloadAction<Movie[]>) => {
      state.movies = action.payload;
      state.error = null;
    });
  },
});

export const selectRecentList = (state: RootState) => state.recentList;
export const recentListReducer = recentListSlice.reducer;
