import { configureStore } from "@reduxjs/toolkit";
import { modalReducer } from "./modal-slice";
import { watchListReducer } from "./watch-list-slice";
import { favoriteListReducer } from "./favorite-list-slice";
import { toastReducer } from "./toast-slice";
import { searchReducer } from "./search-slice";
import { recentListReducer } from "./recent-list-slice";

export const store = configureStore({
  reducer: {
    modal: modalReducer,
    toast: toastReducer,
    watchList: watchListReducer,
    favoriteList: favoriteListReducer,
    search: searchReducer,
    recentList: recentListReducer,
  },
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
