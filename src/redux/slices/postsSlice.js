import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../axios";

export const fetchPosts = createAsyncThunk("/posts/fetchPosts", async () => {
  const { data } = await axios.get("/posts");
  console.log(data);
  return data;
});

export const fetchTags = createAsyncThunk("/posts/fetchTags", async () => {
  const { data } = await axios.get("/posts/tags");
  console.log(data);
  return data;
});

export const fetchRemovePost = createAsyncThunk(
  "/posts/fetchRemovePost",
  async (id) => {
    axios.delete(`/posts/${id}`);
  }
);

// export const fetchYags

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },

  tags: {
    items: [],
    status: "loading",
  },
};

const postSlice = createSlice({
  name: "slice",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPosts.pending]: (state) => {
      state.posts.status = "Loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.status = "Loaded";
      state.posts.items = action.payload;
    },
    [fetchPosts.rejected]: (state) => {
      state.posts.status = "error";
      state.posts.items = [];
    },
    [fetchTags.pending]: (state) => {
      state.tags.status = "Loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.status = "Loaded";
      state.tags.items = action.payload;
    },
    [fetchTags.rejected]: (state) => {
      state.tags.status = "error";
      state.tags.items = [];
    },

    [fetchRemovePost.fulfilled]: (state, action) => {
      state.posts.items = state.posts.items.filter(
        (obj) => obj._id !== action.meta.arg
      );
    },
  },
});
export const postsReducer = postSlice.reducer;
