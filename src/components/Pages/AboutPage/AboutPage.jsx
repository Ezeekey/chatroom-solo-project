import React from 'react';

import { Typography, Paper, Container } from '@mui/material';
import './AboutPage.css';

// This is one of our simplest components
// It doesn't have local state,
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is'

function AboutPage() {
  return (
    <Container>
      <Paper>
        <Typography variant="h3" align="center">About this project</Typography>
        <Typography variant="h4" align="center">Why?</Typography>
        <Container>
          <Typography variant="body1" align="center">This is app is an exercise in minimalism. I am a firm believer of the phrase
          "less is more", and I hope that is seen in the design and function of this program.
          <br />
          Is there any point to extra features if it gets in the way of the experience? Does any app really need to be everything?
          No. When I am browsing Facebook, the only thing I want is to see what family members, and friends are up to.
          I don't need nor want any of the other features that come with it. Often times, I won't even view the
          main feed, because I am not interested in any of the posts that aren't from my friends. It also doesn't
          help that the algorithm keeps showing content that is the total opposite of my interests, but that's an entirely different story.
          <br/>
          With all the noise of modern life, it has become very difficult to have focus. Everything is trying
          to be noticed. Human attention has become a scarce, and desirable resource.
          <br/>
          What is catching your attention? What are you focusing on? Does it bring value? Does it make you truly happy? If not, do you need it?
          Time, at least our time, is not infinite. By removing the unimportant things, we may be adding true value to our lives.
          </Typography>
        </Container>
        <Typography variant="h4" align="center">Technologies</Typography>
        <Container align="center">
          <a href="https://socket.io/" className="picLink">
            <img src="./images/socketlog.svg" width="100px" alt='Socket io'></img>
          </a>
          <a href="https://nodejs.org/en" className="picLink darkCircle">
            <img src="./images/nodelogo.svg" width="300px" alt="Node js"></img>
          </a>
          <a href="https://expressjs.com/" className="picLink">
            <img src="./images/expresslogo.png" width="300px"></img>
          </a>
          <a href="https://www.postgresql.org/" className="picLink">
            <img src="./images/postgresql_logo.png" width="100px"/>
          </a>
          <a href="https://redux.js.org/" className="picLink">
            <img src="./images/reduxlogo.svg" width="100px"></img>
          </a>
          <a href="https://axios-http.com/" className="picLink">
            <img src="./images/axioslogo.svg" width="200px"></img>
          </a>
          <a href="https://mui.com/" className="picLink">
            <img src="./images/muilogo.png" width="100px"></img>
          </a>
          <a href="https://sweetalert2.github.io/" className='picLink'>
            <img src="./images/sweetalertlogo.png" width="300px"></img>
          </a>
          <a href="https://momentjs.com/" className="picLink">
            <img src="./images/momentlogo.png" width="100px"></img>
          </a>
        </Container>
      </Paper>
    </Container>
  );
}

export default AboutPage;
