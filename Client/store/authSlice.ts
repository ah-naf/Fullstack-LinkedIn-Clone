import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { LoginDetailsType, RegDetailsType } from "../utils/type";

toast.configure();

export const asyncLogout = createAsyncThunk(
  "auth/asyncLogout",
  async (payload) => {
    const res = await fetch("http://localhost:5000/api/auth/logout", {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      return { isAuth: false };
    } else {
      toast.error(`${data.message}`, {
        position: "bottom-left",
        theme: "dark",
      });
      return { isAuth: false };
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (payload: RegDetailsType) => {
    const res = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      return { isAuth: true };
    } else {
      toast.error(`${data.message}`, {
        position: "bottom-left",
        theme: "dark",
      });
      return { isAuth: false };
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (payload: LoginDetailsType) => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "applications/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (res.ok) {
      return { isAuth: true };
    } else {
      toast.error(`${data.message}`, {
        position: "bottom-left",
        theme: "dark",
      });
      return { isAuth: false };
    }
  }
);

export const asyncUser = createAsyncThunk("auth/asyncUser", async (payload) => {
  const res = await fetch("http://localhost:5000/api/auth/", {
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      Accept: "applications/json",
    },
  });
  const data = await res.json();
  if (res.ok) {
    return { isAuth: true, user: data.user, details: data.details };
  } else {
    toast.error(`${data.message}`, {
      position: "bottom-left",
      theme: "dark",
    });
    return { isAuth: false, user: {}, details: {} };
  }
});

export const asyncUserSingle = createAsyncThunk(
  "auth/asyncUserSingle",
  async ({ id }: { id: string }) => {
    const res = await fetch(`http://localhost:5000/api/auth/${id}`, {
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "applications/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
      return { user: data.user, details: data.details };
    } else {
      toast.error(`${data.message}`, {
        position: "bottom-left",
        theme: "dark",
      });
      return { isAuth: false, user: {}, details: {} };
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
    isLoading: false,
    user: {},
    userDetails: {},
    visited_user: {},
    visited_userDetails: {},
    current_page: "Discover",
    topBar_page: "details",
    pymk: [],
  },
  reducers: {
    setUser: (state, { payload }) => {
      state.user = payload.current_user;
      state.userDetails = payload.user_details;
      state.isAuth = true;
      state.pymk = payload.pymk;
    },
    setCurPage: (state, { payload }) => {
      state.current_page = payload;
    },
    setTopBarPage: (state, { payload }) => {
      state.topBar_page = payload;
    },
    setVisitedUser: (state, { payload }) => {
      state.visited_user = payload.visited_user;
      state.visited_userDetails = payload.visited_details;
    },
  },
  extraReducers: {
    [asyncUser.fulfilled.type]: (state, { payload }) => {
      state.isAuth = payload.isAuth;
      state.user = payload.user;
      state.userDetails = payload.details;
    },
    [asyncUserSingle.fulfilled.type]: (state, { payload }) => {
      state.isAuth = payload.isAuth;
      state.user = payload.user;
      state.userDetails = payload.details;
      state.visited_userDetails = payload.details;
      state.visited_user = payload.user;
    },
    [registerUser.pending.type]: (state, { payload }) => {
      state.isLoading = true;
    },
    [registerUser.fulfilled.type]: (state, { payload }) => {
      state.isAuth = payload.isAuth;
      state.isLoading = false;
    },
    [loginUser.fulfilled.type]: (state, { payload }) => {
      state.isAuth = payload.isAuth;
      state.isLoading = false;
    },
    [loginUser.pending.type]: (state, { payload }) => {
      state.isLoading = true;
    },
    [asyncLogout.fulfilled.type]: (state, { payload }) => {
      state.isLoading = false;
      state.isAuth = false;
      state.user = {};
      state.userDetails = {};
    },
  },
});

export const { setUser, setCurPage, setTopBarPage, setVisitedUser } =
  authSlice.actions;

export default authSlice;
