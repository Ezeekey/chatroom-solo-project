import React from 'react';
import { useState } from 'react';

import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import { useSelector, useDispatch } from 'react-redux';

import { Container, Typography, TextField, Button, Paper, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);
  // Allows for the server to be contacted
  const dispatch = useDispatch();

  // For editing user statux
  const [editStatusMode, setEditStatusMode] = useState(false);
  const [newStatus, setNewStatus] = useState('');


  function submitNewStatus() {
    // Call the server with new status
    dispatch({ type: 'SET_STATUS', payload: newStatus });
    // Clear the input, and reset the mode to view new status
    setNewStatus('');
    setEditStatusMode(false);
  }

  return (
    <Container>
      <Paper>
        <Typography variant="h2">Welcome, {user.username}!</Typography>
        <Container>
          {
            editStatusMode ?
              <Box>
                <TextField label="New status" value={newStatus} onChange={e => setNewStatus(e.target.value)} fullWidth></TextField>
                <Button variant="outlined" onClick={submitNewStatus}>Edit status<EditIcon/></Button>
              </Box> :
              <Box>
                <Typography variant="body1">Current status: {user.status}</Typography>
                <Button variant="outlined" onClick={() => setEditStatusMode(true)}>Edit status<EditIcon/></Button>
              </Box>
          }
          <LogOutButton className="btn" />
        </Container>
      </Paper>
    </Container >
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
