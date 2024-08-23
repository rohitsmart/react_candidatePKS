import { createSlice } from '@reduxjs/toolkit';

const formSlice = createSlice({
  name: 'form',
  initialState: {},
  reducers: {
    setFormData: (state, action) => {
      state[action.payload.interviewId] = action.payload.data;
    },
    clearFormData: (state, action) => {
      delete state[action.payload];
    },
  },
});

export const { setFormData, clearFormData } = formSlice.actions;
export default formSlice.reducer;
