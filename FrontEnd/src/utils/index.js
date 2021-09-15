import { Button, withStyles, TextField } from '@material-ui/core';

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
  },
})(TextField);
