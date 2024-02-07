import React, { useState, useEffect } from 'react';
import { Table, TableContainer, TableHead, TableRow, TableCell, TableBody, Paper, IconButton, Checkbox } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import TodoItem from './TodoItem';
const Todo = () => {
  const [todos, setTodos] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('access_token'); // Retrieve the token from local storage
        const response = await axios.get('http://localhost:8000/todos/', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
  
    fetchData();
  }, []);

  const handleDeleteTodo = async (id) => {
    try {
      const token = localStorage.getItem('access_token'); // Retrieve the access token from local storage
      await axios.delete(`http://localhost:8000/todos/${id}/`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Replace '/todos/:id' with your API endpoint
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleToggleComplete = async (id) => {
    try {
      const token = localStorage.getItem('access_token'); // Retrieve the access token from local storage
      const updatedTodo = await axios.patch(`http://localhost:8000/todos/${id}/`, {
        completed: !todos.find((todo) => todo.id === id).completed,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }); // Replace '/todos/:id' with your API endpoint
      setTodos(todos.map((todo) => (todo.id === id ? updatedTodo.data : todo)));
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const handleUpdateTodo = async (updatedTodo) => {
    const url = `http://localhost:8000/todos/${updatedTodo.id}/`; // Adjust based on your actual API endpoint
    try {
      const token = localStorage.getItem('access_token'); // Retrieve the access token from local storage
      console.log(updatedTodo)
      const response = await axios.patch(url, updatedTodo, {
        headers: {
          'Content-Type': 'application/json', // Ensure correct content type
          Authorization: `Bearer ${token}`, // Include authentication if needed
        },
      });
      const updatedTodoData = await response.data;
  
      // Update your todos state or data store
      setTodos(prevTodos => prevTodos.map(todo => (todo.id === updatedTodo.id ? updatedTodoData : todo)));
  
      // Optional success feedback
      console.log('Todo updated successfully!');
  
    } catch (error) {
      // Handle errors gracefully (e.g., display error message to the user)
      console.error('Error updating todo:', error);
      // You can add specific error handling based on different error types or codes
    }
  };
  

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell align="center">Description</TableCell>
            <TableCell align="center">Completed</TableCell>
            <TableCell align="center">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              handleDeleteTodo={handleDeleteTodo}
              handleToggleComplete={handleToggleComplete}
              handleUpdateTodo={handleUpdateTodo}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Todo;