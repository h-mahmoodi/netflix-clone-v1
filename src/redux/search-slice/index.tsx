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
  },
});

export const { addToRecentSearch } = searchSlice.actions;
export const searchReducer = searchSlice.reducer;
export const selectSearch = (state: RootState) => state.search;
