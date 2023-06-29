import React from 'react';
import LoginForm from './LoginForm';
import { useHistory } from 'react-router-dom';

import { Paper, Container } from '@mui/material';

function LoginPage() {
  const history = useHistory();

  return (
    <Container>
      <Paper>
        <LoginForm />

        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push('/registration');
            }}
          >
            Register
          </button>
        </center>
      </Paper>
    </Container>
  );
}

export default LoginPage;
