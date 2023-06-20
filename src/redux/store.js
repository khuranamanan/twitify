import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import allUsersReducer from "./slices/allUsersSlice";
import postsReducer from "./slices/postsSlice";
import modalsReducer from "./slices/modalsSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    allUsers: allUsersReducer,
    posts: postsReducer,
    modals: modalsReducer,
  },
});
