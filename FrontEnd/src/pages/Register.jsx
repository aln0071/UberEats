import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FormControl,
  Paper,
  Typography,
  FormControlLabel,
  RadioGroup,
} from '@material-ui/core';
import styles from '../styles.scss';
import {
  BlackButton,
  BlackFormLabel,
  BlackRadio,
  BlackTextField,
} from '../utils';

const register = () => {};

export default function Register() {
  const [registerDetails, setRegisterDetails] = useState({
    type: 'customer',
  });
  const handleChange = (event) => {
    setRegisterDetails({
      ...registerDetails,
      [event.target.id]: event.target.value,
    });
  };

  return (
    <div className={styles.loginContainer}>
      <Paper elevation={3} style={{ padding: '10px' }}>
        <Typography variant="h4">Register</Typography>
        <div className={styles.loginInput}>
          <FormControl component="fieldset">
            <BlackFormLabel component="legend">Type</BlackFormLabel>
            <RadioGroup
              id="type"
              row
              aria-label="gender"
              name="row-radio-buttons-group"
              value={registerDetails.type}
              onChange={(e) => {
                handleChange({
                  target: {
                    value: e.target.value,
                    id: 'type',
                  },
                });
              }}
            >
              <FormControlLabel
                value="customer"
                control={<BlackRadio />}
                label="Customer"
              />
              <FormControlLabel
                value="restaurant"
                control={<BlackRadio />}
                label="Restaurant"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={styles.loginInput}>
          <BlackTextField
            label={
              registerDetails.type === 'customer' ? 'Name' : 'Restaurant Name'
            }
            type="text"
            id="name"
            onChange={handleChange}
            fullWidth
          />
        </div>
        <div className={styles.loginInput}>
          <BlackTextField
            label="Email"
            type="email"
            onChange={handleChange}
            id="email"
            fullWidth
          />
        </div>
        <div className={styles.loginInput}>
          <BlackTextField
            label="Password"
            type="password"
            onChange={handleChange}
            id="password"
            fullWidth
          />
        </div>
        <div className={styles.loginButton}>
          <BlackButton variant="contained" fullWidth onClick={register}>
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
