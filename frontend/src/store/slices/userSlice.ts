import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from 'interfaces/IUser';
import { getUserInfo } from 'services/apiService';
import { UNKNOWN_ERROR } from 'constants/constants';
import { IUnauthorizedPayload } from 'interfaces/IUnauthorizedPayload';

interface UserProfileState {
  data: IUser | null;
  loading: boolean;
  error: IUnauthorizedPayload | null;
}

const initialState: UserProfileState = {
  data: null,
  loading: false,
  error: null
};

export const getUserProfleThunk = createAsyncThunk<IUser, void, { rejectValue: IUnauthorizedPayload | string }>(
  'user/me',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserInfo();
      return response;
    } catch (error: any) {
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(UNKNOWN_ERROR);
      }
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserProfleThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfleThunk.fulfilled, (state, action: PayloadAction<IUser>) => {
        state.data = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getUserProfleThunk.rejected, (state, action: PayloadAction<IUnauthorizedPayload | any>) => {
        state.loading = false;
        state.error = (action.payload as IUnauthorizedPayload) ?? UNKNOWN_ERROR;
      });
  }
});

export const { actions: userProfileActions, reducer: userProfileReducer } = userProfileSlice;
