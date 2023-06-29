import React from 'react';

import { useHistory } from 'react-router-dom';
import RegisterForm from './RegisterForm';

import { Container, Paper } from '@mui/material';

function RegisterPage() {
  const history = useHistory();

  return (
    <Container >
      <Paper>
        <RegisterForm />

        <center>
          <button
            type="button"
            className="btn btn_asLink"
            onClick={() => {
              history.push('/login');
            }}
          >
            Log in
          </button>
        </center>
      </Paper>
    </Container>
  );
}

export default RegisterPage;
