import { createAsyncThunk } from '@reduxjs/toolkit';
import { getUserFromDb, insertUserInfoNotExists, LoginFromDb } from '../../utils/db';


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