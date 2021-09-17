import React from 'react';

const UserContext = React.createContext({
  userDetails: JSON.parse(window.sessionStorage.getItem('userDetails')) || {},
  setUserDetails: () => {},
});

export default UserContext;
