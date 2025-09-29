import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  deleteNoteFromDb,
  getAllNotesFromDb,
  insertNoteDb,
  updateNoteFromDb,
} from '../../utils/db';

export const createNote = createAsyncThunk(
  'notes/createNote',
  async ({ userid, title, description }, { rejectWithValue }) => {
    try {
      const result = await insertNoteDb({ userid, title, description });
      return result;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);
export const getAllNotes = createAsyncThunk(
  'notes/getAllNotes',
  async ({ userid }) => {
    try {
      const result = await getAllNotesFromDb({ userid });
      return result;
    } catch (error) {
      rejectWithValue(error.message);
    }
  },
);

export const deleteNote = createAsyncThunk(
  'notes/deleteNote',
  async (id, { rejectWithValue, dispatch, getState }) => {
    try {
      const response = await deleteNoteFromDb(id);

      //notu sildikten sonra databasedeki notlari cek
      const userid = getState().auth.user.id;
      // notlari tekrar yukle
      const response2 = await dispatch(getAllNotes({ userid }));
      return response2;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  },
);

export const updateNote = createAsyncThunk(
  'notes/updateNote',
  async ({ noteId, title, description }, { getState }) => {
    try {
      const userid = getState().auth.user.id;

      const response = await updateNoteFromDb({
        noteId,
        title,
        description,
        userid,
      });

      return response;
    } catch (err) {
      console.log(err);
    }
  },
);
