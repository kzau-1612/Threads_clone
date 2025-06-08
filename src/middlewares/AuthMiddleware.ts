import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../lib/axios";

export const getAuthProfile = createAsyncThunk("auth/profile", async (_, { rejectWithValue }) => {
  try {
    const { data: response } = await apiClient.get("/auth/profile");
    return response.data;
  } catch (error) {
    console.log(error);
    return rejectWithValue("Unauthorized");
  }
});
