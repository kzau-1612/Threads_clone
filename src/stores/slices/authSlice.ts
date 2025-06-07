import { createSlice } from "@reduxjs/toolkit";
export type AuthState = { isAuth: boolean };

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
  },
  reducers: {
    updateAuthStatus: (state: AuthState, action) => {
      state.isAuth = action.payload;
    },
  },
});

export const { updateAuthStatus } = authSlice.actions;

export default authSlice.reducer;
