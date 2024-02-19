import { configureStore } from '@reduxjs/toolkit';
import { registerUserReducer } from './slices/registerUserSlice';
import { loginReducer } from './slices/loginSlice';
import { userProfileReducer } from './slices/userSlice';

export const store = configureStore({
  reducer: {
    registerUser: registerUserReducer,
    login: loginReducer,
    profile: userProfileReducer
  }
});

// Types for RootState and AppDispatch to be used throughout the app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
