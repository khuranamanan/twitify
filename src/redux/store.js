import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import allUsersReducer from "./slices/allUsersSlice";
import postsReducer from "./slices/postsSlice";
import modalsReducer from "./slices/modalsSlice";
import themeReducer from "./slices/themeSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    allUsers: allUsersReducer,
    posts: postsReducer,
    modals: modalsReducer,
    theme: themeReducer,
  },
});
