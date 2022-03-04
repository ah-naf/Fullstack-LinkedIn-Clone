import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { SendCompanyType } from "../utils/type";
import { toast } from "react-toastify";

toast.configure();

export const asyncCompany = createAsyncThunk(
  "post/asyncCompany",
  async ({ company }: { company: SendCompanyType }) => {
    const res = await fetch("http://localhost:5000/api/company", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(company),
    });
    const data = await res.json();
    if (res.ok) {
      toast.success("Company created successfully", {
        position: "bottom-left",
        theme: "dark",
      });
    } else {
      toast.error(`${data.msg}`, {
        position: "bottom-left",
        theme: "dark",
      });
      return;
    }
  }
);

export const asyncCompanyGet = createAsyncThunk(
  "post/asyncCompanyGet",
  async ({id} : {id: string}) => {
    const res = await fetch(`http://localhost:5000/api/company/?id=${id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    if (res.ok) {
    } else {
      toast.error(`${data.msg}`, {
        position: "bottom-left",
        theme: "dark",
      });
      return;
    }
  }
);

export const asyncCompanyPic = createAsyncThunk(
  "post/asyncCompanyPic",
  async ({ formData, type }: { formData: FormData, type: number }) => {
    const res = await fetch("http://localhost:5000/api/company/upload", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    const data = await res.json();
    if (res.ok) {
      return {type, image: data.image}
    } else {
      toast.error(`${data.msg}`, {
        position: "bottom-left",
        theme: "dark",
      });
      return;
    }
  }
);

const companySlice = createSlice({
  name: "company",
  initialState: {
      logo_pic: '',
      cover_pic: '',
      uploading: false,
      companies: []
  },
  reducers: {
    setCompany: (state, {payload}) => {
      state.companies = payload.company
    }
  },
  extraReducers: {
      [asyncCompanyPic.fulfilled.type]: (state, {payload}) => {
        if(payload.type === 1) {
            state.logo_pic = payload.image
        } else {
            state.cover_pic = payload.image
        }
        state.uploading = false
      },
      [asyncCompanyPic.pending.type]: (state, {payload}) => {
          state.uploading = true
      }
  },
});

export const {setCompany} = companySlice.actions

export default companySlice;
