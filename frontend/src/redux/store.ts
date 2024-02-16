
import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loggedUserReducer from './loggedUser';

export const store = configureStore({
    reducer: {
        user: loggedUserReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;