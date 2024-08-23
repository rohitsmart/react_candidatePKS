import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import interviewReducer from './slices/interviewSlice'; // Import the new slice

export const store = configureStore({
    reducer: {
        auth: authReducer,
        interview: interviewReducer, // Add the new slice

    },
});
