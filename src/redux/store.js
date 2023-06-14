import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import allUsersReducer from "./slices/allUsersSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    allUsers: allUsersReducer,
  },
});
