import { createSlice } from "@reduxjs/toolkit";
export type AuthState = { isAuth: boolean };

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuth: false,
  },
  reducers: {
    updateStatus: (state: AuthState, action) => {
      state.isAuth = action.payload;
    },
  },
});

export default authSlice.reducer;
