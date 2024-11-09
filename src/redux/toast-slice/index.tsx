import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Toast } from "@src/types/toast";
import { RootState } from "../store";

const initialState: Toast[] = [];

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    addToast(state, action: PayloadAction<string>) {
      const newToast: Toast = {
        id: Date.now(),
        message: action.payload,
      };
      state.push(newToast);
    },
    removeToast(state, action: PayloadAction<number>) {
      return state.filter((item) => item.id !== action.payload);
    },
  },
});

export const selectToast = (state: RootState) => state.toast;
export const { addToast, removeToast } = toastSlice.actions;
export const toastReducer = toastSlice.reducer;
