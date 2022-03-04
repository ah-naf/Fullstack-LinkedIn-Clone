import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ExperienceType, SkillType, SummaryType } from "../utils/type";
import { toast } from "react-toastify";

toast.configure();

export const asyncSummary = createAsyncThunk(
  "profile/asyncSummary",
  async ({ id, summary }: { id: string; summary: string }) => {
    const res = await fetch(
      `http://localhost:5000/api/profile/${id}?summary=1`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ summary }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      toast.error(`${data.msg}`, {
        position: "bottom-left",
        theme: "dark",
      });
      return true;
    }
  }
);

export const asyncExperience = createAsyncThunk(
  "profile/asyncExperience",
  async ({ id, experience }: ExperienceType) => {
    const res = await fetch(
      `http://localhost:5000/api/profile/${id}?experience=1`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ experience }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      toast.error(`${data.msg}`, {
        position: "bottom-left",
        theme: "dark",
      });
      return true;
    }
  }
);

export const asyncEducation = createAsyncThunk(
  "profile/asyncEducation",
  async ({ id, experience }: ExperienceType) => {
    const res = await fetch(
      `http://localhost:5000/api/profile/${id}?education=1`,
      {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ education: experience }),
      }
    );
    const data = await res.json();
    if (!res.ok) {
      toast.error(`${data.msg}`, {
        position: "bottom-left",
        theme: "dark",
      });
      return true;
    }
  }
);

export const asyncName = createAsyncThunk(
  "profile/asyncName",
  async ({ id, name }: { id: string; name: string }) => {
    const res = await fetch(`http://localhost:5000/api/profile/${id}?name=1`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name }),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(`${data.msg}`, {
        position: "bottom-left",
        theme: "dark",
      });
      return true;
    }
  }
);

export const asyncBio = createAsyncThunk(
  "profile/asyncBio",
  async ({ id, bio }: { id: string; bio: string }) => {
    const res = await fetch(`http://localhost:5000/api/profile/${id}?bio=1`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ bio }),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(`${data.msg}`, {
        position: "bottom-left",
        theme: "dark",
      });
      return true;
    }
  }
);

export const asyncSkill = createAsyncThunk(
  "profile/asyncSkill",
  async ({ id, skill }: SkillType) => {
    const res = await fetch(`http://localhost:5000/api/profile/${id}?skill=1`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ skill }),
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(`${data.msg}`, {
        position: "bottom-left",
        theme: "dark",
      });
      return true;
    }
  }
);

export const asyncAvatar = createAsyncThunk(
  "profile/asyncAvatar",
  async (formData: FormData) => {
    const res = await fetch("http://localhost:5000/api/profile/upload", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      toast.error(`${data.msg}`, {
        position: "bottom-left",
        theme: "dark",
      });
      return '/no-user.jpg';
    }
    return data.avatar
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    error: false,
    uploading: false,
    avatar: ''
  },
  reducers: {},
  extraReducers: {
    [asyncSummary.fulfilled.type]: (state, { payload }) => {
      state.error = payload;
    },
    [asyncAvatar.pending.type]: (state, { payload }) => {
      state.uploading = true
    },
    [asyncAvatar.fulfilled.type]: (state, { payload }) => {
      state.uploading = false
      state.avatar = payload
    },
    [asyncAvatar.rejected.type]: (state, { payload }) => {
      state.uploading = false
      state.error = true
    },
  },
});

// export const {} = profileSlice.actions

export default profileSlice;
