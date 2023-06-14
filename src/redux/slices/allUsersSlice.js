import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsersService } from "../../services/users/usersServices";

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
  },
});

export default allUsersSlice.reducer;
