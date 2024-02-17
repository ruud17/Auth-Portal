import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/IUser';

interface LoggedUserState {
  loggedUser: IUser | null;
  loading: boolean;
  error: string | null;
}

const initialState: LoggedUserState = {
  loggedUser: null,
  loading: false,
  error: null,
};

const loggedUserReducer = createSlice({
  name: 'loggedUser',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<IUser>) {
      state.loggedUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.error = JSON.stringify(action.payload);
    },
  },
});

export const { setUser, setLoading, setError } = loggedUserReducer.actions;

export default loggedUserReducer.reducer;
