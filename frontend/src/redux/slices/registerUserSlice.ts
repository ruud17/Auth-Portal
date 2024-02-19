import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { IRegistrationFields } from 'interfaces/IRegistrationFields';
import { registerNewUser } from 'services/apiService';
import { UNKNOWN_ERROR } from 'constants/constants';

interface RegisterUserState {
  error: string | null;
}

const initialState: RegisterUserState = {
  error: null
};

export const registerUserThunk = createAsyncThunk<void, IRegistrationFields, { rejectValue: string }>(
  'user/register',
  async (registerUserBody: IRegistrationFields, { rejectWithValue }) => {
    try {
      await registerNewUser(registerUserBody);
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(UNKNOWN_ERROR);
      }
    }
  }
);

const registerUserSlice = createSlice({
  name: 'registerUser',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUserThunk.rejected, (state, action: PayloadAction<string | undefined>) => {
      state.error = action.payload || UNKNOWN_ERROR;
    });
  }
});

export const { actions: registerUserActions, reducer: registerUserReducer } = registerUserSlice;
