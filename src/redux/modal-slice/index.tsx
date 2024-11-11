import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ReactNode } from "react";

type ModalState = {
  isOpen: boolean;
  title: string;
  content: ReactNode | null;
};

const initialState: ModalState = {
  isOpen: false,
  title: "",
  content: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (
      state,
      action: PayloadAction<{ title: string; content: ReactNode | null }>
    ) => {
      state.isOpen = true;
      state.title = action.payload.title;
      state.content = action.payload.content;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.title = "";
      state.content = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
export const modalReducer = modalSlice.reducer;
