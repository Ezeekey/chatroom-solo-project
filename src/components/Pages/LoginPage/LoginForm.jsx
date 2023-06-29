import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { Typography, TextField, Container, Button, Box } from '@mui/material';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(store => store.errors);
  const dispatch = useDispatch();

  const login = (event) => {
    event.preventDefault();

    if (username && password) {
      dispatch({
        type: 'LOGIN',
        payload: {
          username: username,
          password: password,
        },
      });
    } else {
      dispatch({ type: 'LOGIN_INPUT_ERROR' });
    }
  }; // end login

  return (
    <Container>
      <Typography variant="h3" align="center">Log in</Typography>
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
        <Button variant="contained" color="secondary" onClick={login}>Log in</Button>
      </Box>
    </Container>
  );
}

export default LoginForm;
