import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postModal: false,
  editPostContent: null,
};

export const modalsSlice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    openPostModal: (state) => {
      state.postModal = true;
    },
    openPostModalForEdit: (state, action) => {
      state.postModal = true;
      state.editPostContent = action.payload.editPost;
    },
    closePostModal: (state) => {
      state.postModal = false;
      state.editPostContent = null;
    },
  },
});

export const { openPostModal, openPostModalForEdit, closePostModal } =
  modalsSlice.actions;

export default modalsSlice.reducer;
