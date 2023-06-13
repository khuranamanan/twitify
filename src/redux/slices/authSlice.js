import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { logInService, signUpService } from "../../services/auth/authServices";

const tokenFromLocalStorage = JSON.parse(
  localStorage.getItem("loginData")
)?.token;
const userFromLocalStorage = JSON.parse(
  localStorage.getItem("loginData")
)?.user;

const initialState = {
  token: tokenFromLocalStorage,
  user: userFromLocalStorage,
  isLoggedIn: !!tokenFromLocalStorage,
  isLoading: false,
};

export const handleLogIn = createAsyncThunk(
  "auth/handleLogIn",
  async function ({ username, password }, thunkAPI) {
    try {
      const response = await logInService(username, password);
      return response.data;
    } catch (err) {
      console.log("error from handleLogIn", err);
      return thunkAPI.rejectWithValue(err.response.data.errors[0]);
    }
  }
);

export const handleSignUp = createAsyncThunk(
  "auth/handleSignUp",
  async function ({ username, password, firstName, lastName }, thunkAPI) {
    try {
      const response = await signUpService(
        username,
        password,
        firstName,
        lastName
      );
      return response.data;
    } catch (err) {
      console.log("error from handleSignUp", err);
      return thunkAPI.rejectWithValue(err.response.data.errors[0]);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    handleLogOut: (state) => {
      localStorage.removeItem("loginData");
      state.token = null;
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: {
    [handleLogIn.pending]: (state) => {
      state.isLoading = true;
    },
    [handleLogIn.fulfilled]: (state, action) => {
      state.token = action.payload.encodedToken;
      state.user = action.payload.foundUser;
      state.isLoggedIn = true;
      state.isLoading = false;
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          token: action.payload.encodedToken,
          user: action.payload.foundUser,
        })
      );
    },
    [handleLogIn.rejected]: (state, action) => {
      console.log("thunkAPI handleLogIn error", action.payload);
      state.isLoading = false;
    },

    [handleSignUp.pending]: (state) => {
      state.isLoading = true;
    },
    [handleSignUp.fulfilled]: (state, action) => {
      state.token = action.payload.encodedToken;
      state.user = action.payload.createdUser;
      state.isLoggedIn = true;
      state.isLoading = false;
      localStorage.setItem(
        "loginData",
        JSON.stringify({
          token: action.payload.encodedToken,
          user: action.payload.createdUser,
        })
      );
    },
    [handleSignUp.rejected]: (state, action) => {
      console.log("thunkAPI handleSignUp error", action.payload);
      state.isLoading = false;
    },
  },
});

export const { handleLogOut } = authSlice.actions;

export default authSlice.reducer;
