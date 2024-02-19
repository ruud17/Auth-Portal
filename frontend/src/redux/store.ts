import { configureStore } from '@reduxjs/toolkit';
import { registerUserReducer } from './registerUserSlice';

export const store = configureStore({
  reducer: {
    registerUser: registerUserReducer
  }
});

// Types for RootState and AppDispatch to be used throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
