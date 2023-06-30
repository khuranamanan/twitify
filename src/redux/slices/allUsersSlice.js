import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  editUserProfileService,
  followAUserService,
  getAllUsersService,
  getUserByUsernameService,
  unfollowAUserService,
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

export const unfollowAUser = createAsyncThunk(
  "allUsers/unfollowAUser",
  async function ({ followUserID, token }, thunkAPI) {
    try {
      const response = await unfollowAUserService(followUserID, token);
      thunkAPI.dispatch(updateUserObj({ newUserObj: response.data.user }));
      return response.data;
    } catch (err) {
      console.log("error from unfollowAuser", err);
      return thunkAPI.rejectWithValue(err.response.data.errors[0]);
    }
  }
);

export const getProfilePageUser = createAsyncThunk(
  "allUsers/getProfilePageUser",
  async function (username, thunkAPI) {
    try {
      const response = await getUserByUsernameService(username);
      return response.data;
    } catch (err) {
      console.log("error from getProfilePageUser", err);
      return thunkAPI.rejectWithValue(err.response.data.errors[0]);
    }
  }
);

export const editUserProfile = createAsyncThunk(
  "allUsers/editUserProfile",
  async function ({ userData, token }, thunkAPI) {
    try {
      const response = await editUserProfileService(userData, token);

      thunkAPI.dispatch(updateUserObj({ newUserObj: response.data.user }));
      return response.data;
    } catch (err) {
      console.log("error from editUserProfile", err);
      return thunkAPI.rejectWithValue(err.response.data.errors[0]);
    }
  }
);

const initialState = {
  allUsers: [],
  profilePageUser: null,
  profilePageUserStatus: null,
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

    [unfollowAUser.pending]: (state) => {
      state.isLoading = true;
    },
    [unfollowAUser.fulfilled]: (state, action) => {
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
    [unfollowAUser.rejected]: (state, payload) => {
      console.log("promise Rejected from unfollowAUser", payload);
      state.isLoading = false;
    },

    [getProfilePageUser.pending]: (state) => {
      state.profilePageUserStatus = "pending";
    },
    [getProfilePageUser.fulfilled]: (state, action) => {
      state.profilePageUser = action.payload.user;
      state.profilePageUserStatus = "fulfilled";
    },
    [getProfilePageUser.rejected]: (state, payload) => {
      console.log("promise Rejected from getProfilePageUser", payload);
      state.profilePageUserStatus = "rejected";
    },

    [editUserProfile.pending]: (state) => {
      state.isLoading = true;
    },
    [editUserProfile.fulfilled]: (state, action) => {
      state.allUsers = [...state.allUsers].map((twitifyUser) =>
        twitifyUser._id === action.payload.user._id
          ? action.payload.user
          : twitifyUser
      );
      state.isLoading = false;
    },
    [editUserProfile.rejected]: (state, payload) => {
      console.log("promise Rejected from editUserProfile", payload);
      state.isLoading = false;
    },
  },
});

export default allUsersSlice.reducer;
