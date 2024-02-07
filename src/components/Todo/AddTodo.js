import React, { useState } from 'react';
import { TextField, Button, Modal, Box, Typography, IconButton } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';

const AddTodo = ({ onAddTodo }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddTodo = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const userId = localStorage.getItem('user_id');
      const response = await axios.post(
        'http://localhost:8000/todos/',
        {
          user: userId,
          completed: false,
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      onAddTodo(response.data);
      setTitle('');
      setDescription('');
      handleClose();
      window.location.reload(); 
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleOpen}>
        Add Todo
      </Button>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={handleClose}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h4" component="div" gutterBottom>
            Add Todo
          </Typography>
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <Button variant="contained" onClick={handleAddTodo} sx={{ mt: 2 }}>
            Add Todo
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default AddTodo;