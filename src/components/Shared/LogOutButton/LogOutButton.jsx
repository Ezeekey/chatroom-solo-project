import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';

function LogOutButton(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <Button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      variant="contained"
      color="secondary"
      onClick={() => {
        dispatch({ type: 'LOGOUT' });
        history.push('/home');
      }}
    >
      Log Out<LogoutIcon/>
    </Button>
  );
}

export default LogOutButton;
