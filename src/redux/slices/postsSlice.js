import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createPostService,
  deleteUsersPostService,
  editPostService,
  getAllPostsService,
  likePostService,
  unlikePostService,
} from "../../services/posts/postsServices";

const initialState = {
  allPosts: [],
  isLoading: false,
  initialLoading: false,
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
  async function ({ post, token }, thunkAPI) {
    try {
      const response = await createPostService(post, token);
      return response.data;
    } catch (err) {
      console.log("Error from createUserPost", err);
      return thunkAPI.rejectWithValue(err.response.data.errors[0]);
    }
  }
);

export const deleteUserPost = createAsyncThunk(
  "posts/deleteUserPost",
  async function ({ postID, token }, thunkAPI) {
    try {
      const response = await deleteUsersPostService(postID, token);
      return response.data;
    } catch (err) {
      console.log("Error from deleteUserPost", err);
      return thunkAPI.rejectWithValue(err.response.data.errors[0]);
    }
  }
);

export const editUserPost = createAsyncThunk(
  "posts/editUserPost",
  async function ({ newPost, token }, thunkAPI) {
    try {
      const response = await editPostService(newPost, token);
      return response.data;
    } catch (err) {
      console.log("Error from editUserPost", err);
      return thunkAPI.rejectWithValue(err.response.data.errors[0]);
    }
  }
);

export const likePost = createAsyncThunk(
  "posts/likePost",
  async function ({ postID, token }, thunkAPI) {
    try {
      const response = await likePostService(postID, token);
      return response.data;
    } catch (err) {
      console.log("Error from likePost", err);
      return thunkAPI.rejectWithValue(err.response.data.errors[0]);
    }
  }
);

export const unlikePost = createAsyncThunk(
  "posts/unlikePost",
  async function ({ postID, token }, thunkAPI) {
    try {
      const response = await unlikePostService(postID, token);
      return response.data;
    } catch (err) {
      console.log("Error from unlikePost", err);
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
      state.initialLoading = true;
    },
    [getAllPosts.fulfilled]: (state, action) => {
      state.allPosts = action.payload.posts;
      state.isLoading = false;
      state.initialLoading = false;
    },
    [getAllPosts.rejected]: (state, action) => {
      console.log("Promise Rejected from getAllPosts", action.payload);
      state.isLoading = false;
      state.initialLoading = false;
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

    [deleteUserPost.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUserPost.fulfilled]: (state, action) => {
      state.allPosts = action.payload.posts;
      state.isLoading = false;
    },
    [deleteUserPost.rejected]: (state, payload) => {
      console.log("promise Rejected from deleteUserPost", payload);
      state.isLoading = false;
    },

    [editUserPost.pending]: (state) => {
      state.isLoading = true;
    },
    [editUserPost.fulfilled]: (state, action) => {
      state.allPosts = action.payload.posts;
      state.isLoading = false;
    },
    [editUserPost.rejected]: (state, payload) => {
      console.log("promise Rejected from editUserPost", payload);
      state.isLoading = false;
    },

    [likePost.fulfilled]: (state, action) => {
      state.allPosts = action.payload.posts;
    },
    [likePost.rejected]: (state, payload) => {
      console.log("promise Rejected from likePost", payload);
    },

    [unlikePost.fulfilled]: (state, action) => {
      state.allPosts = action.payload.posts;
    },
    [unlikePost.rejected]: (state, payload) => {
      console.log("promise Rejected from unlikePost", payload);
    },
  },
});

export default postsSlice.reducer;
