import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { SendJobType } from "../utils/type";

toast.configure();

export const asyncJob = createAsyncThunk(
    "post/asyncJob",
    async ({ job }: { job: SendJobType }) => {
      const res = await fetch("http://localhost:5000/api/job", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({job}),
      });
      const data = await res.json();
      if (res.ok) {
        
      } else {
        toast.error(`${data.message}`, {
          position: "bottom-left",
          theme: "dark",
        });
        return;
      }
    }
  );


const jobSlice = createSlice({
  name: "job",
  initialState: {
      jobs: []
  },
  reducers: {
      setJob: (state, {payload}) => {
          state.jobs = payload
      }
  },
  extraReducers: {},
});

export const {setJob} = jobSlice.actions

export default jobSlice;
