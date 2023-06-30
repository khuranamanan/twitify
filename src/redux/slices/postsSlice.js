import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createPostService,
  deleteUsersPostService,
  editPostService,
  getAllPostsService,
  getUserPostsByUsernameSercive,
  likePostService,
  unlikePostService,
} from "../../services/posts/postsServices";
import { toast } from "react-toastify";

const initialState = {
  allPosts: [],
  isLoading: false,
  initialLoading: false,
  profilePageUserPosts: [],
  profilePageUserPostsStatus: null,
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

export const getProfilePageUserPosts = createAsyncThunk(
  "posts/getProfilePageUserPosts",
  async function (username, thunkAPI) {
    try {
      const response = await getUserPostsByUsernameSercive(username);
      return response.data;
    } catch (err) {
      console.log("Error from getProfilePageUserPosts", err);
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
      toast.success("Posted");
    },
    [createUserPost.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },

    [deleteUserPost.pending]: (state) => {
      state.isLoading = true;
    },
    [deleteUserPost.fulfilled]: (state, action) => {
      state.allPosts = action.payload.posts;
      state.isLoading = false;
      toast.success("Post Deleted");
    },
    [deleteUserPost.rejected]: (state, action) => {
      console.log("promise Rejected from deleteUserPost", action.payload);
      state.isLoading = false;
      toast.error(action.payload);
    },

    [editUserPost.pending]: (state) => {
      state.isLoading = true;
    },
    [editUserPost.fulfilled]: (state, action) => {
      state.allPosts = action.payload.posts;
      state.isLoading = false;
      toast.success("Post Edited");
    },
    [editUserPost.rejected]: (state, action) => {
      state.isLoading = false;
      toast.error(action.payload);
    },

    [likePost.fulfilled]: (state, action) => {
      state.allPosts = action.payload.posts;
    },
    [likePost.rejected]: (state, action) => {
      toast.error(action.payload);
    },

    [unlikePost.fulfilled]: (state, action) => {
      state.allPosts = action.payload.posts;
    },
    [unlikePost.rejected]: (state, action) => {
      toast.error(action.payload);
    },

    [getProfilePageUserPosts.pending]: (state) => {
      state.profilePageUserPostsStatus = "pending";
    },
    [getProfilePageUserPosts.fulfilled]: (state, action) => {
      state.profilePageUserPosts = action.payload.posts;
      state.profilePageUserPostsStatus = "fulfilled";
    },
    [getProfilePageUserPosts.rejected]: (state, action) => {
      console.log(
        "promise Rejected from getProfilePageUserPosts",
        action.payload
      );
      state.profilePageUserPostsStatus = "rejected";
    },
  },
});

export default postsSlice.reducer;
