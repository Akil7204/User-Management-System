import { createSlice, current } from "@reduxjs/toolkit";

const initialState = {
  currentAdmin: null,
  loading: false,
  error: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminSignInStart: (state) => {
      state.loading = true;
    },
    adminSignInSuccess: (state, action) => {
      state.currentAdmin = action.payload;
      state.loading = false;
      state.error = false;
    },
    adminSignInFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
   
    signOut: (state) => {
      state.currentAdmin = null;
      state.loading = false;
      state.error = false;
    },
   
  },
});

export const {
  adminSignInStart,
  adminSignInSuccess,
  adminSignInFailure,
  signOut,
} = adminSlice.actions;
export default adminSlice.reducer;
