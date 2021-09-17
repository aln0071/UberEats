import React, { useState } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Routes from './Routes';
import 'react-toastify/dist/ReactToastify.css';
import UserContext from './utils/usercontext';

const App = () => {
  const [userDetails, setUserDetails] = useState(
    JSON.parse(window.sessionStorage.getItem('userDetails')) || {},
  );
  const value = { userDetails, setUserDetails };

  return (
    <div className="App">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
      <ToastContainer />
      <UserContext.Provider value={value}>
        <Routes />
      </UserContext.Provider>
    </div>
  );
};

export default App;
