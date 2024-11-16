import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { loadFromLocalStorage, saveToLocalStorage } from "@src/utils/helpers";

type SearchStateType = {
  searchedKeywords: string[];
};

const initialState: SearchStateType = {
  searchedKeywords:
    loadFromLocalStorage<string[]>("recent_Search_Keywords") || [],
};

export const addToRecentSearch = createAsyncThunk<
  string[],
  string,
  { rejectValue: string }
>("search/addToRecentSearch", async (keyword, { rejectWithValue }) => {
  try {
    const localSearchKeywords: string[] =
      loadFromLocalStorage<string[]>("recent_Search_Keywords") || [];
    const newSearchKeywords: string[] = [
      ...new Set([keyword, ...localSearchKeywords]),
    ];
    const limitedKeywords = newSearchKeywords.slice(0, 10);
    saveToLocalStorage("recent_Search_Keywords", limitedKeywords);
    return newSearchKeywords;
  } catch (error) {
    console.log(error);
    return rejectWithValue("Error adding search keyword");
  }
});

export const removeFromRecentSearch = createAsyncThunk<
  string[],
  string,
  { rejectValue: string }
>("search/removeFromRecentSearch", async (keyword, { rejectWithValue }) => {
  try {
    const localSearchKeywords: string[] =
      loadFromLocalStorage<string[]>("recent_Search_Keywords") || [];
    const newSearchKeywords = localSearchKeywords.filter(
      (searchKeyword) => searchKeyword !== keyword
    );
    saveToLocalStorage("recent_Search_Keywords", newSearchKeywords);
    return newSearchKeywords;
  } catch (error) {
    console.log(error);
    return rejectWithValue("Error removing search keyword");
  }
});

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToRecentSearch.fulfilled, (state, action) => {
      state.searchedKeywords = action.payload;
    });
    builder.addCase(removeFromRecentSearch.fulfilled, (state, action) => {
      state.searchedKeywords = action.payload;
    });
  },
});

export const searchReducer = searchSlice.reducer;
export const selectSearch = (state: RootState) => state.search;
