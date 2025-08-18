import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserFromDb, insertUserInfoNotExists, LoginFromDb } from '../../utils/db';
import { createUser, loginUser } from '../actions/authActions';

const initialState = {
  isLogin: false,
  user: {},
  pendingLogin: false,
  pendingRegister: false,
  pendingUpdate: false,
  error: null,
};


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(createUser.pending, state => {
        (state.pendingRegister = true), (state.error = null);
      })
      .addCase(createUser.rejected, (state, action) => {
        (state.pendingRegister = false), (state.error = action.payload);
      })
      .addCase(createUser.fulfilled, (state, action) => {
        (state.pendingRegister = false),
          (state.user = action.payload.user),
          (state.error = null),
          (state.isLogin = true);
      })
      .addCase(loginUser.pending, state => {
        (state.pendingLogin = true), (state.error = null);
      })
      .addCase(loginUser.rejected, (state, action) => {
        (state.pendingLogin = false), (state.error = action.payload);
        state.isLogin = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        (state.pendingLogin = false),
          (state.user = action.payload.user),
          (state.error = null),
          (state.isLogin = true);
      });
  },
});



export default authSlice.reducer;
