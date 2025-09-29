import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getUserFromDb, insertUserInfoNotExists, LoginFromDb } from '../../utils/db';
import { UpdateUser } from '../actions/authActions';

const initialState = {
  isLogin: false,
  user: {},
  pendingLogin: false,
  pendingRegister: false,
  pendingUpdate: false,
  error: null,
};

export const createUser = createAsyncThunk(
  'auth/createUser',
  async (values, { rejectWithValue }) => {
    try {
      const response = await insertUserInfoNotExists(values);
      const response2 = await getUserFromDb(response.Userid);
      const user = response2.user;

      return { response, user };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({email,password},{rejectWithValue})=>{
    try {
      const response = await LoginFromDb(email,password);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut:(state, action)=>{
      state.user = null;
      state.isLogin = false;
    }
  },
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
      })
      .addCase(UpdateUser.pending, (state,action) => {
        state.pendingUpdate = true;
      })
      .addCase(UpdateUser.rejected, (state, action) => {
        state.pendingUpdate = false;
        state.error = action.payload;
      })
      .addCase(UpdateUser.fulfilled, (state, action) => {
        state.pendingUpdate = false;
        state.user = action.payload;
        state.error = null;
      })
  }
});


export const { logOut } = authSlice.actions;
export default authSlice.reducer;
