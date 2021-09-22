import React from 'react';
import {
  Button,
  withStyles,
  TextField,
  FormLabel,
  Radio,
  FormControl,
} from '@material-ui/core';

// this object stores the options applied to toasts in the project
export const toastOptions = {
  position: 'bottom-right',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
};

// black button
export const BlackButton = withStyles({
  root: {
    backgroundColor: '#23272b',
    color: 'white',
    '&:hover': {
      backgroundColor: '#343a40',
    },
  },
})(Button);

// black text field
export const BlackTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiInput-underline.Mui-error:after': {
      borderBottomColor: '#f44336',
    },
  },
})(TextField);

export const BlackFormLabel = withStyles({
  root: {
    '&.Mui-focused': {
      color: 'black',
    },
  },
})(FormLabel);

export const BlackRadio = withStyles({
  root: {
    '&.Mui-checked': {
      color: 'black',
    },
    color: 'black',
  },
})(Radio);

export const BlackFormControl = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'black',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'black',
    },
    '& .MuiInput-underline.Mui-error:after': {
      borderBottomColor: '#f44336',
    },
  },
})(FormControl);

// function to create toast message from error
export const createToastBody = (error) => (
  <div>
    <b>Error:</b>
    {' '}
    {error.message}
  </div>
);
