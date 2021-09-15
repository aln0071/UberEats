import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import styles from '../styles.scss';
import { toastOptions, BlackButton, BlackTextField } from '../utils';

const loginUser = () => {
  toast.error('Error: Login failed', toastOptions);
};

export default function Login() {
  return (
    <div className={styles.loginContainer}>
      <Paper elevation={3} style={{ padding: '10px' }}>
        <Typography variant="h4">Login</Typography>
        <div className={styles.loginInput}>
          <BlackTextField id="login-email" label="Email" type="email" />
        </div>
        <div className={styles.loginInput}>
          <BlackTextField
            id="login-password"
            label="Password"
            type="password"
          />
        </div>
        <div className={styles.loginButton}>
          <BlackButton variant="contained" fullWidth onClick={loginUser}>
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
