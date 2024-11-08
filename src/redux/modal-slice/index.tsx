import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { ReactNode } from "react";

type ModalState = {
  isOpen: boolean;
  content: ReactNode | null;
};

const initialState: ModalState = {
  isOpen: false,
  content: null,
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<ReactNode>) => {
      state.isOpen = true;
      state.content = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
export const modalReducer = modalSlice.reducer;
