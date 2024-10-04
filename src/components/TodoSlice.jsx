import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addDoc, collection, deleteDoc, doc, setDoc } from 'firebase/firestore';
import { db } from './Firebase-datas/FireBase';
import { updateDoc } from "firebase/firestore";

export const addTodoAsync = createAsyncThunk("addTodoAsync", async (todo, { rejectWithValue }) => {
    try {
        const docRef = await addDoc(collection(db, "todos"), todo)
        await setDoc(docRef, { ...todo, id: docRef.id })
        return { ...todo, id: docRef.id }
    } catch (error) {
        console.error("Error adding todo:", error);
        return rejectWithValue(error.message)
    }
});

export const removeTodoAsync = createAsyncThunk("removeTodoAsync", async (id, { rejectWithValue }) => {
    try {
        await deleteDoc(doc(db, "todos", id))
        return id
    } catch (error) {
        console.error("Error removing todo:", error);
        return rejectWithValue(error.message)
    }
});

export const updateTodoAsync = createAsyncThunk("updateTodoAsync", async ({title, id}, { rejectWithValue }) => {
    try {
        await updateDoc(doc(db, "todos", id), { title })
        return {title, id}
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.message)
    }
})


export const todoSlice = createSlice({
    name: "todos",
    initialState: { todos: [], loading: false, error: "" },
    reducers: {},
    extraReducers: (builder) => {
        // Add Todo
        builder.addCase(addTodoAsync.fulfilled, (state, action) => {
            state.loading = false
            state.todos.push(action.payload)
        })
        builder.addCase(addTodoAsync.pending, (state) => {
            state.loading = true
            state.error = "Error"
        })
        builder.addCase(addTodoAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        // Remove Todo
        builder.addCase(removeTodoAsync.fulfilled, (state, action) => {
            state.loading = false
            state.todos = state.todos.filter((todo) => todo.id !== action.payload)
        })
        builder.addCase(removeTodoAsync.pending, (state) => {
            state.loading = true
            state.error = "Error"
        })
        builder.addCase(removeTodoAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })

        //Update Todo
        builder.addCase(updateTodoAsync.fulfilled, (state, action) => {
            state.loading = false
            state.todos = state.todos.map((todo) => todo.id === action.payload.id ? { ...todo, title: action.payload.title } : todo)
        })
        builder.addCase(updateTodoAsync.pending, (state, action) => {
            state.loading = true
            state.error = "Error"
        })
        builder.addCase(updateTodoAsync.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
        })
    }
});

export default todoSlice.reducer;