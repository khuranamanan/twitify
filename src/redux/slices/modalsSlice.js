import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postModal: false,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openPostModal: (state) => {
      state.postModal = true;
    },
    closePostModal: (state) => {
      state.postModal = false;
    },
  },
});

export const { openPostModal, closePostModal } = modalsSlice.actions;

export default modalsSlice.reducer;
