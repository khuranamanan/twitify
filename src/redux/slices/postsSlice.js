import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllPostsService } from "../../services/posts/postsServices";

const initialState = {
  allPosts: [],
  isLoading: false,
};

export const getAllPosts = createAsyncThunk(
  "posts/getAllPosts",
  async function (_, thunkAPI) {
    try {
      const response = await getAllPostsService();
      return response.data;
    } catch (err) {
      console.log("Error from getAllPosts", err);
      return thunkAPI.rejectWithValue(err.response.data.errors[0]);
    }
  }
);

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    [getAllPosts.pending]: (state) => {
      state.isLoading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.allPosts = action.payload.posts;
      state.isLoading = false;
    },
    [getAllPosts.rejected]: (state, action) => {
      console.log("Promise Rejected from getAllPosts", action.payload);
      state.isLoading = false;
    },
  },
});

export default postsSlice.reducer;
