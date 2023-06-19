import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createPostService,
  getAllPostsService,
} from "../../services/posts/postsServices";

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

export const createUserPost = createAsyncThunk(
  "post/createUserPost",
  async ({ post, token }, thunkAPI) => {
    try {
      const response = await createPostService(post, token);
      return response.data;
    } catch (err) {
      console.log("Error from createUserPost", err);
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

    [createUserPost.pending]: (state) => {
      state.isLoading = true;
    },
    [createUserPost.fulfilled]: (state, action) => {
      state.allPosts = action.payload.posts;
      state.isLoading = false;
    },
    [createUserPost.rejected]: (state, payload) => {
      console.log("promise Rejected from createUserPost", payload);
      state.isLoading = false;
    },
  },
});

export default postsSlice.reducer;
