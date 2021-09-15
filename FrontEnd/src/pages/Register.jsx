import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography } from '@material-ui/core';
import styles from '../styles.scss';
import { BlackButton, BlackTextField } from '../utils';

const registerUser = () => {};

export default function Register() {
  return (
    <div className={styles.loginContainer}>
      <Paper elevation={3} style={{ padding: '10px' }}>
        <Typography variant="h4">Register</Typography>
        <div className={styles.loginInput}>
          <BlackTextField id="register-email" label="Email" type="email" />
        </div>
        <div className={styles.loginInput}>
          <BlackTextField
            id="register-password"
            label="Password"
            type="password"
          />
        </div>
        <div className={styles.loginButton}>
          <BlackButton variant="contained" fullWidth onClick={registerUser}>
            Register
          </BlackButton>
        </div>
        <div className={styles.loginNoAccount}>
          <Link to="/login">Already have an account?</Link>
        </div>
      </Paper>
    </div>
  );
}
