import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getAllNotesFromDb, insertNoteDb } from '../../utils/db';

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
    "notes/getAllNotes",
    async ({userid}) => {
        try {
            const result = await getAllNotesFromDb({userid});
            return result;
        } catch (error) {
             rejectWithValue(error.message);
        }
       
    }
)

const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {},

     extraReducers: (builder) => {
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
                state.notes.push(action.payload.note)
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
            });
  },
});

export default noteSlice.reducer;
