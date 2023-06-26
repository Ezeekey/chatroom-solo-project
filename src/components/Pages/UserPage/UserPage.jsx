import React from 'react';
import { useState } from 'react';

import LogOutButton from '../../Shared/LogOutButton/LogOutButton';
import { useSelector } from 'react-redux';

import { Container, Typography, TextField, Button } from '@mui/material';

function UserPage() {
  // this component doesn't do much to start, just renders some user reducer info to the DOM
  const user = useSelector((store) => store.user);

  // For editing user statux
  const [editStatusMode, setEditStatusMode] = useState(false);
  const [newStatus, setNewStatus] = useState('');


  function submitNewStatus() {
    // Clear the input, and reset the mode to view new status
    setNewStatus('');
    setEditStatusMode(false);
  }

  return (
    <Container>
      <Typography variant="h2">Welcome, {user.username}!</Typography>
      {
        editStatusMode ?
          <Container>
            <TextField label="New status" value={newStatus} onChange={e => setNewStatus(e.target.value)} fullWidth></TextField>
            <Button variant="outlined" onClick={submitNewStatus}>Edit status</Button>
          </Container> :
          <Container>
            <Typography variant="body1">Current status: {user.status}</Typography>
            <Button variant="outlined" onClick={() => setEditStatusMode(true)}>Edit status</Button>
          </Container>
      }
      <LogOutButton className="btn" />
    </Container>
  );
}

// this allows us to use <App /> in index.js
export default UserPage;
