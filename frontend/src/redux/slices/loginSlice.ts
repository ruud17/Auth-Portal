import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { login } from 'services/apiService';
import { UNKNOWN_ERROR } from 'constants/constants';
import { ILoginFields } from 'interfaces/ILoginFields';

interface LoginState {
  error: string | null;
}

const initialState: LoginState = {
  error: null
};

export const loginThunk = createAsyncThunk<void, ILoginFields, { rejectValue: string }>(
  'user/login',
  async (loginBody: ILoginFields, { rejectWithValue }) => {
    try {
      await login(loginBody);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(UNKNOWN_ERROR);
      }
    }
  }
);

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload || UNKNOWN_ERROR;
    });
  }
});

export const { actions: loginActions, reducer: loginReducer } = loginSlice;
