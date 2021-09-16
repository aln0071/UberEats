import React from 'react';

const UserContext = React.createContext({
  userDetails: {},
  setUserDetails: () => {},
});

export default UserContext;
