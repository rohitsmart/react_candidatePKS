import { createSlice } from '@reduxjs/toolkit';

const interviewSlice = createSlice({
  name: 'interview',
  initialState: {},
  reducers: {
    setInterviewData: (state, action) => {
      const { interviewId, data } = action.payload;
      state[interviewId] = data;
    },
    clearInterviewData: (state, action) => {
      const { interviewId } = action.payload;
      delete state[interviewId];
    },
  },
});

export const { setInterviewData, clearInterviewData } = interviewSlice.actions;
export default interviewSlice.reducer;
