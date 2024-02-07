import React, { useState } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  IconButton,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { TableRow, TableCell } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoItem = ({ todo, handleDeleteTodo, handleToggleComplete, handleUpdateTodo }) => {
  const [openModal, setOpenModal] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);
  const [editedDescription, setEditedDescription] = useState(todo.description);
  const [editedCompleted, setEditedCompleted] = useState(todo.completed);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  console.log(editedCompleted)

  const handleEditSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    console.log(editedTitle)
    console.log(editedDescription)
    handleUpdateTodo({ id: todo.id, title: editedTitle, description: editedDescription, completed: editedCompleted });
    handleCloseModal();
  };


  return (
    <>
      <TableRow key={todo.id} onClick={handleOpenModal}> {/* Make the entire row clickable */}
        <TableCell>{todo.title}</TableCell>
        <TableCell align="center">{todo.description}</TableCell>
        <TableCell align="center">
          <Checkbox checked={todo.completed} onChange={() => handleToggleComplete(todo.id)} />
        </TableCell>
        <TableCell align="center">
          <IconButton aria-label="Delete" color="secondary" onClick={() => handleDeleteTodo(todo.id)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <IconButton
            sx={{ position: "absolute", top: 0, right: 0 }}
            onClick={handleCloseModal}
            aria-label="Close"
          >
            <CloseIcon />
          </IconButton>
          <h2>Edit Todo</h2>
          <form onSubmit={handleEditSubmit}>
            <TextField
              autoFocus
              margin="normal"
              fullWidth
              label="Title"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Description"
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
            />
            <FormGroup row> {/* Use a FormGroup for consistent styling */}
              <FormControlLabel
                control={<Checkbox checked={editedCompleted} onChange={(e) => {
                  setEditedCompleted(!editedCompleted)
                }}/>}
                label="Complete"
              />
            </FormGroup>
            <Button type="submit" variant="contained">
              Save
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default TodoItem;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
