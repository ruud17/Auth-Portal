import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../interfaces/IUser';
import { getUserInfo } from '../services/apiService';
import axios from 'axios';

interface UserState {
  loggedUser: IUser | null;
  loading: boolean;
  error: string | null | undefined;
}

const initialState: UserState = {
  loggedUser: null,
  loading: false,
  error: null
};

export const fetchProfile = createAsyncThunk<IUser, void, { rejectValue: string }>(
  'user/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserInfo();
      return response;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        return rejectWithValue(error.response.data);
      } else {
        // Handle unexpected errors
        return rejectWithValue('An unexpected error occurred');
      }
    }
  }
);

// const userSlice = createSlice({
//   name: 'user',
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProfile.pending, (state) => {
//         state.loading = true;
//         state.error = null; // Optionally reset the error state on new requests
//       })
//       .addCase(fetchProfile.fulfilled, (state, action: PayloadAction<IUser>) => {
//         state.loggedUser = action.payload;
//         state.loading = false;
//       })
//       .addCase(
//         fetchProfile.rejected,
//         (state, action: PayloadAction<string | null | undefined, string, unknown, Error>) => {
//           state.loading = false;
//           state.error = action.payload;
//         },
//       );
//   },
// });

//export default userSlice.reducer;
