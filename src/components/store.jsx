import { configureStore, createAsyncThunk } from "@reduxjs/toolkit"
import todoSlice from "./TodoSlice"

export const store = configureStore({
    reducer: {
        allTodos: todoSlice
    }
})