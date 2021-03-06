import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Paper, Typography } from '@material-ui/core';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import styles from '../styles.scss';
import {
  toastOptions,
  BlackButton,
  BlackTextField,
  createToastBody,
} from '../utils';
import { login } from '../utils/endpoints';
import { loginAction } from '../store/actions';
import Logo from '../images/Logo';

export default function Login() {
  const dispatch = useDispatch();

  const loginUser = async (username, password) => {
    try {
      const data = await login(username, password);
      toast.success('Success: Loggedin', toastOptions);
      dispatch(loginAction(data));
    } catch (error) {
      toast.error(createToastBody(error), toastOptions);
    }
  };

  const handleChange = (event) => event.target.value;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  if (useSelector((state) => state.user.token)) {
    return <Redirect to="/home" />;
  }
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContainerLogo}>
        <Logo />
      </div>
      <Paper elevation={3} style={{ padding: '10px' }}>
        <Typography variant="h4">Login</Typography>
        <div className={styles.loginInput}>
          <BlackTextField
            value={username}
            label="Email"
            type="email"
            inputProps={{ 'data-testid': 'email-input' }}
            onChange={(e) => setUsername(handleChange(e))}
          />
        </div>
        <div className={styles.loginInput}>
          <BlackTextField
            value={password}
            label="Password"
            type="password"
            inputProps={{ 'data-testid': 'password-input' }}
            onChange={(e) => setPassword(handleChange(e))}
          />
        </div>
        <div className={styles.loginButton}>
          <BlackButton
            variant="contained"
            fullWidth
            data-testid="login"
            onClick={() => {
              loginUser(username, password);
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
