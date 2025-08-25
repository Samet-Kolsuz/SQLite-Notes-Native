import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  deleteNoteFromDb,
  getAllNotesFromDb,
  insertNoteDb,
  updateNoteFromDb,
} from '../../utils/db';

const initialState = {
  notes: [],
  pending: false,
  error: null,
};

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

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {},

  extraReducers: builder => {
    builder

      // NOT OLUŞTURMA İŞLEMİNİN ASENKRON SONUÇLARI
      // a) bekleniyor
      .addCase(createNote.pending, (state, action) => {
        state.pending = true;
        state.error = null;
      })
      // b) başarısız
      .addCase(createNote.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      })
      // c) başarılı
      .addCase(createNote.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.notes.push(action.payload.note);
      })

      // BÜTÜN NOTLARI ALMA ASENKRON İŞLEMİNİN SONUÇLARI
      // a) bekleniyor
      .addCase(getAllNotes.pending, (state, action) => {
        state.pending = true;
        state.error = null;
      })

      // b) başarısız
      .addCase(getAllNotes.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      })
      // c) başarılı
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.notes = action.payload;
      })
      // NOT SİLME ASENKRON İŞLEMİNİN SONUÇLARI

      .addCase(deleteNote.pending, (state, action) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(deleteNote.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.notes = action.payload.payload;
      })
    // NOT GÜNCELLEME ASENKRON İŞLEMİNİN SONUÇLARI
    .addCase(updateNote.pending, (state, action) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(updateNote.rejected, (state, action) => {
        state.pending = false;
        state.error = action.payload;
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        state.pending = false;
        state.error = null;
        state.notes = action.payload;
      })
  },
});

export default noteSlice.reducer;
