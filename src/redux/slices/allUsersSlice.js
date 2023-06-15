import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  followAUserService,
  getAllUsersService,
} from "../../services/users/usersServices";
import { updateUserObj } from "./authSlice";

export const getAllUsers = createAsyncThunk(
  "allUsers/getAllUsers",
  async function (_, thunkAPI) {
    try {
      const response = await getAllUsersService();
      return response.data;
    } catch (err) {
      console.log("error from getAllUsers", err);
      return thunkAPI.rejectWithValue(err.response.data.errors[0]);
    }
  }
);

export const followAUser = createAsyncThunk(
  "allUsers/followAUser",
  async function ({ followUserID, token }, thunkAPI) {
    try {
      const response = await followAUserService(followUserID, token);
      thunkAPI.dispatch(updateUserObj({ newUserObj: response.data.user }));
      return response.data;
    } catch (err) {
      console.log("error from followAuser", err);
      return thunkAPI.rejectWithValue(err.response.data.errors[0]);
    }
  }
);

const initialState = {
  allUsers: [],
  isLoading: false,
};

export const allUsersSlice = createSlice({
  name: "allUsers",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllUsers.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllUsers.fulfilled]: (state, action) => {
      state.allUsers = action.payload.users;
      state.isLoading = false;
    },
    [getAllUsers.rejected]: (state, payload) => {
      console.log("promise Rejected from getAllUsers", payload);
      state.isLoading = false;
    },

    [followAUser.pending]: (state) => {
      state.isLoading = true;
    },
    [followAUser.fulfilled]: (state, action) => {
      state.allUsers = [...state.allUsers].map((twitifyUser) =>
        twitifyUser._id === action.payload.user._id
          ? action.payload.user
          : twitifyUser
      );

      state.allUsers = [...state.allUsers].map((twitifyUser) =>
        twitifyUser._id === action.payload.followUser._id
          ? action.payload.followUser
          : twitifyUser
      );

      state.isLoading = false;
    },
    [followAUser.rejected]: (state, payload) => {
      console.log("promise Rejected from followAUser", payload);
      state.isLoading = false;
    },
  },
});

export default allUsersSlice.reducer;
