import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import Routes from './Routes';
import 'react-toastify/dist/ReactToastify.css';

const App = () => (
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
    <Routes />
  </div>
);

export default App;
