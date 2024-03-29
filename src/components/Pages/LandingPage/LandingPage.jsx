import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Container, Paper, Typography } from "@mui/material";

function LandingPage() {
  const history = useHistory();

  return (
    <Container>
      <Paper>
        <Typography variant="h3" align="center">Welcome to</Typography>
        <img src="./images/budchatlogo_big.png" alt="Budchat"></img>
        <Typography variant="h5" align="center">Please click the login button above to continue</Typography>
      </Paper>
    </Container>
  );
}

export default LandingPage;
