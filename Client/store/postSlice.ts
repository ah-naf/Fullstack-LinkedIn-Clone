import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { PostType, SendCommentType, SendPostType } from "../utils/type";

toast.configure();

export const asyncPost = createAsyncThunk(
  "post/asyncPost",
  async (payload: SendPostType) => {
    const res = await fetch("http://localhost:5000/api/post/", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
    } else {
      toast.error(`${data.message}`, {
        position: "bottom-left",
        theme: "dark",
      });
    }
  }
);

export const asyncLike = createAsyncThunk(
  "post/asyncLike",
  async ({post_id, likes}: {post_id: string, likes: string}) => {
    const res = await fetch("http://localhost:5000/api/post/like", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({post_id, likes}),
    });
    const data = await res.json();
    if (res.ok) {
    } else {
      toast.error(`${data.message}`, {
        position: "bottom-left",
        theme: "dark",
      });
    }
  }
);

export const asyncComment = createAsyncThunk(
  "post/asyncComment",
  async ({comment, currentComment}: {comment: SendCommentType[], currentComment: {post_id: string}}) => {
    const res = await fetch("http://localhost:5000/api/post/comment", {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({comment, currentComment}),
    });
    const data = await res.json();
    if (res.ok) {
    } else {
      toast.error(`${data.message}`, {
        position: "bottom-left",
        theme: "dark",
      });
    }
  }
);

export const asyncCommentDelete = createAsyncThunk(
  "post/asyncCommentDelete",
  async ({post_id}: {post_id: string}) => {
    const res = await fetch("http://localhost:5000/api/post/comment", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({post_id}),
    });
    const data = await res.json();
    if (res.ok) {
    } else {
      toast.error(`${data.message}`, {
        position: "bottom-left",
        theme: "dark",
      });
    }
  }
);

export const asyncGetPost = createAsyncThunk(
  "post/asyncGetPost",
  async (payload) => {
    const res = await fetch("http://localhost:5000/api/post", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await res.json();
    if (res.ok) {
      return data
    } else {
      toast.error(`${data.message}`, {
        position: "bottom-left",
        theme: "dark",
      });
      return []
    }
  }
);

export const asyncGetPostSingle = createAsyncThunk(
  "post/asyncGetPostSingle",
  async ({id}: {id: string}) => {
    const res = await fetch(`http://localhost:5000/api/post/${id}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const data = await res.json();
    if (res.ok) {
      return data
    } else {
      toast.error(`${data.message}`, {
        position: "bottom-left",
        theme: "dark",
      });
      return {}
    }
  }
);

const postSlice = createSlice({
  name: "post",
  initialState: {
    allPost: [],
  },
  reducers: {
    setPost: (state, { payload }) => {
      state.allPost = payload;

    },
  },
  extraReducers: {
    [asyncGetPost.fulfilled.type]: (state, {payload}) => {
      state.allPost = payload
    },
    [asyncGetPostSingle.fulfilled.type]: (state, {payload}) => {
      state.allPost = payload
    }
  },
});

export const { setPost } = postSlice.actions;

export default postSlice;
