import { createSlice } from "@reduxjs/toolkit";
import { getAuthProfile } from "../../middlewares/AuthMiddleware";

interface AuthState {
  isAuth: boolean;
  user: null | { name: string; email: string; status: number };
  isLoading: boolean;
}

const initialState: AuthState = {
  isAuth: false,
  user: null,
  isLoading: true,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    updateAuthStatus: (state, action) => {
      state.isAuth = action.payload;
    },
    updateAuthUser: (state, action) => {
      state.user = action.payload;
    },
    updateLoadingStatus: (state, action) => {
      state.isLoading = action.payload;
    },
    resetAuth: (state) => {
      state.isAuth = false;
      state.user = null;
      state.isLoading = false;
    },
    updateAuth: (state, action) => {
      state.isAuth = true;
      state.user = action.payload.user;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAuthProfile.fulfilled, (state, action) => {
      state.isAuth = true;
      state.user = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAuthProfile.rejected, (state) => {
      state.isAuth = false;
      state.user = null;
      state.isLoading = false;
    });
  },
});

export const { updateAuthStatus, updateAuthUser, updateLoadingStatus, resetAuth, updateAuth } =
  authSlice.actions;

export default authSlice.reducer;
