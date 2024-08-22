import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || {
      username: null,
      firstName: null,
      lastName: null,
      empId: null,
      designation: null,
      role: null,
    },
  },
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      localStorage.setItem('token', action.payload);
    },
    clearToken: (state) => {
      state.token = null;
      localStorage.removeItem('token');
    },
    setUserDetails: (state, action) => {
      state.user = action.payload;
      localStorage.setItem('user', JSON.stringify(action.payload));
    },
    clearUserDetails: (state) => {
      state.user = {
        username: null,
        firstName: null,
        lastName: null,
        empId: null,
        designation: null,
        role: null,
      };
      localStorage.removeItem('user');
    },
  },
});

export const { setToken, clearToken, setUserDetails, clearUserDetails } = authSlice.actions;
export default authSlice.reducer;
