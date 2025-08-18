import { configureStore } from "@reduxjs/toolkit";
import authReducer  from './slices/authSlice'; 
import noteReducer from './slices/noteSlice'; // Assuming you have a noteSlice for notes

const store = configureStore({
    reducer:{
        auth: authReducer,
        note: noteReducer, // Assuming you have a noteReducer imported

    }
})
export default store;