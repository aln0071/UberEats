import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { clearMessageAction } from './store/actions';
import Routes from './Routes';

const App = () => {
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(clearMessageAction());
  };
  const { message, type } = useSelector((state) => state.message);
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
      {type === 'success' && (
        <div className="alert alert-success alert-dismissible">
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            onClick={handleClose}
          >
            &times;
          </button>
          <strong>Success!</strong>
          {' '}
          {message}
        </div>
      )}
      {type === 'error' && (
        <div className="alert alert-danger alert-dismissible">
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            onClick={handleClose}
          >
            &times;
          </button>
          <strong>Error!</strong>
          {' '}
          {message}
        </div>
      )}
      <Routes />
    </div>
  );
};

export default App;
