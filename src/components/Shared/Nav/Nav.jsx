import React from 'react';
import { Link } from 'react-router-dom';
import LogOutButton from '../LogOutButton/LogOutButton';
import './Nav.css';
import { useSelector } from 'react-redux';

import { Button, Box } from '@mui/material';

function Nav() {
  const user = useSelector((store) => store.user);

  return (
    <div className="nav">
      <Link to="/home">
        <h2 className="nav-title">Prime Solo Project</h2>
      </Link>
      <Box alignSelf="right" className="navButton">
        {/* If no user is logged in, show these links */}
        {!user.id && (
          // If there's no user, show login/registration links
          <Link to="/login">
           <Button variant="contained" color="secondary">Login / register</Button>
          </Link>
        )}

        {/* If a user is logged in, show these links */}
        {user.id && (
          <>
            <Link to="/user">
              <Button variant="outlined">Home</Button>
            </Link>

            <Link to="/info">
              <Button variant="outlined">Info</Button>
            </Link>

            <Link to="/lobby">
              <Button variant="outlined">Lobby</Button>
            </Link>

            <Link to="/buddy">
              <Button variant="outlined">Buddies</Button>
            </Link>

            <Link to="/invite">
              <Button variant="outlined">Invites</Button>
            </Link>

            <LogOutButton className="navLink" />
          </>
        )}

        <Link to="/about">
          <Button variant="outlined">About</Button>
        </Link>
      </Box>
    </div>
  );
}

export default Nav;
