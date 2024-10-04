import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoAsync, removeTodoAsync, updateTodoAsync } from './TodoSlice';

function TodoList() {
    const { todos, error } = useSelector((store) => store.allTodos)
    console.log("Todos array in TodoList component:", todos)

    const dispatch = useDispatch()
    const [newTodo, setNewTodo] = useState("")
    const [editTodo, setEditTodo] = useState("")
    const [isEditing, setIsEditing] = useState(null)

    const handleAddTodo = () => {
        if (newTodo.trim() === "") return
        const newTodoObj = { title: newTodo }
        dispatch(addTodoAsync(newTodoObj))
        setNewTodo("")
    };

    const handleRemoveTodo = (id) => {
        console.log("Removing todo with ID:", id)
        dispatch(removeTodoAsync(id))
    };

    const handleEditTodo = (todo) => {
        setIsEditing(todo.id)
        setEditTodo(todo.title)
    }

    const handleSaveTodo = (id) => {
        if (editTodo.trim() === "") return
        dispatch(updateTodoAsync({ title: editTodo, id }))
        setIsEditing(null)
        setEditTodo("")
    }

    return (
        <div>
            <input type="text" value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder="Enter todo" />
            <button onClick={handleAddTodo}>Add todo</button>

            {error && <div></div>}
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id} style={{ listStyle: "none", marginBottom: "10px" }}>
                        {isEditing === todo.id ? (
                            <div>
                                <input type="text" value={editTodo} onChange={(e) => setEditTodo(e.target.value)} />
                                <button onClick={() => handleSaveTodo(todo.id)}>Save</button>
                            </div>
                        ) : (
                            <div>
                                <span>{todo.title}</span>
                                <button onClick={() => handleEditTodo(todo)} style={{ marginLeft: "10px", marginRight: "6px" }}>Edit</button>
                                <button onClick={() => handleRemoveTodo(todo.id)}>Remove</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TodoList;