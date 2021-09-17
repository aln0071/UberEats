import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import styles from '../styles.scss';
import {
  toastOptions,
  BlackButton,
  BlackTextField,
  createToastBody,
} from '../utils';
import login from '../utils/endpoints';

const loginUser = async (username, password, setUserDetails) => {
  try {
    const data = await login(username, password);
    toast.success('Success: Loggedin', toastOptions);
    window.sessionStorage.setItem('userDetails', JSON.stringify(data));
    setUserDetails(data);
  } catch (error) {
    toast.error(createToastBody(error), toastOptions);
  }
};

export default function Login({ setUserDetails }) {
  const handleChange = (event) => event.target.value;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className={styles.loginContainer}>
      <Paper elevation={3} style={{ padding: '10px' }}>
        <Typography variant="h4">Login</Typography>
        <div className={styles.loginInput}>
          <BlackTextField
            value={username}
            label="Email"
            type="email"
            onChange={(e) => setUsername(handleChange(e))}
          />
        </div>
        <div className={styles.loginInput}>
          <BlackTextField
            value={password}
            label="Password"
            type="password"
            onChange={(e) => setPassword(handleChange(e))}
          />
        </div>
        <div className={styles.loginButton}>
          <BlackButton
            variant="contained"
            fullWidth
            onClick={() => {
              loginUser(username, password, setUserDetails);
            }}
          >
            Login
          </BlackButton>
        </div>

        <div className={styles.loginNoAccount}>
          <Link to="/register">Dont have an account?</Link>
        </div>
      </Paper>
    </div>
  );
}

Login.defaultProps = {
  setUserDetails: () => {},
};

Login.propTypes = {
  setUserDetails: PropTypes.func,
};
