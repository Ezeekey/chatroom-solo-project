import React from 'react';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';

function LogOutButton(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  return (
    <button
      // This button shows up in multiple locations and is styled differently
      // because it's styled differently depending on where it is used, the className
      // is passed to it from it's parents through React props
      className={props.className}
      onClick={() => {
        dispatch({ type: 'LOGOUT' });
        history.push('/home');
      }}
    >
      Log Out
    </button>
  );
}

export default LogOutButton;
