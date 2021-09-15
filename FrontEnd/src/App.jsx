import React, { useEffect } from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Routes from './Routes';
import 'react-toastify/dist/ReactToastify.css';

const getApi = () => {
  const url = 'http://localhost:3001';
  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    });
};

const App = () => {
  useEffect(() => {
    getApi();
  }, []);

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
      <Routes />
    </div>
  );
};

export default App;
