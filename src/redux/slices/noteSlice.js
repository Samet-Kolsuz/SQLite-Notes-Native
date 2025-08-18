import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    notes: [],
    pending: false,
    error: null
}


const noteSlice = createSlice({
    name:"note",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            
    }
})

export default noteSlice.reducer;