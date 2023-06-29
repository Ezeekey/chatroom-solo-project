import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Typography, Box, TextField, Button} from '@mui/material';

function RegisterForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector((store) => store.errors);
  const dispatch = useDispatch();

  const registerUser = (event) => {
    event.preventDefault();

    dispatch({
      type: 'REGISTER',
      payload: {
        username: username,
        password: password,
      },
    });
  }; // end registerUser

  return (
    <Container>
      <Typography variant="h3" align="center">Register</Typography>
      {errors.loginMessage && (
        <h3 className="alert" role="alert">
          {errors.loginMessage}
        </h3>
      )}
      <Box align="center">
        <TextField label="User name" onChange={e => setUsername(e.target.value)} value={username} />
        <TextField label="Password" onChange={e => setPassword(e.target.value)} value={password} type="password" />
      </Box>
      <Box align="center">
        <Button variant="contained" color="secondary" onClick={registerUser}>register</Button>
      </Box>
    </Container>
  );
}

export default RegisterForm;
