import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

type SearchStateType = {
  searchedKeywords: string[];
};

const initialState: SearchStateType = {
  searchedKeywords: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    addToRecentSearch: (state, action) => {
      const newKeywords = [action.payload, ...state.searchedKeywords];
      state.searchedKeywords = [...new Set(newKeywords)].slice(0, 10);
    },
    removeFromRecentSearch: (state, action) => {
      state.searchedKeywords = state.searchedKeywords.filter(
        (item) => item !== action.payload
      );
    },
  },
});

export const { addToRecentSearch, removeFromRecentSearch } =
  searchSlice.actions;
export const searchReducer = searchSlice.reducer;
export const selectSearch = (state: RootState) => state.search;
