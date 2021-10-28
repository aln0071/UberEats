import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  FormControl,
  Paper,
  Typography,
  FormControlLabel,
  RadioGroup,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import styles from '../styles.scss';
import {
  BlackButton,
  BlackFormLabel,
  BlackRadio,
  BlackTextField,
  createToastBody,
  toastOptions,
} from '../utils';
import { register } from '../utils/endpoints';
import { isValid, validations } from '../utils/validations';
import Location from '../components/Location';
import Logo from '../images/Logo';
import {
  clearRegisterErrorsAction,
  setRegisterErrorsAction,
} from '../store/actions/register';

export default function Register() {
  const history = useHistory();

  const dispatch = useDispatch();

  const defaultLocation = {
    country: '',
    state: '',
    // citycode: '',
    location: '',
    zip: '',
  };
  const [registerDetails, setRegisterDetails] = useState({
    type: 'c',
    name: '',
    email: '',
    password: '',
    location: { ...defaultLocation },
  });

  const errors = useSelector((state) => state.registerErrors);

  // const [errors, setErrors] = useState({});
  const [locationErrors, setLocationErrors] = useState({});

  const handleChange = (event) => {
    if (JSON.stringify(errors) !== '{}') {
      dispatch(clearRegisterErrorsAction());
    }
    setLocationErrors({});
    if (event.target.id === 'type') {
      registerDetails.location = { ...defaultLocation };
    }
    setRegisterDetails({
      ...registerDetails,
      [event.target.id]: event.target.value,
    });
  };

  const onSubmit = async () => {
    const localErrors = {};
    const customerProfile = validations.register.customer;
    Object.keys(customerProfile).forEach((key) => {
      if (!isValid(customerProfile[key].regex, registerDetails[key])) {
        localErrors[key] = customerProfile[key].message;
      }
    });
    dispatch(setRegisterErrorsAction(localErrors));

    const localLocationErrors = {};
    if (registerDetails.type === 'r') {
      const locationProfile = validations.register.location;
      Object.keys(locationProfile).forEach((key) => {
        if (
          !isValid(locationProfile[key].regex, registerDetails.location[key])
        ) {
          localLocationErrors[key] = locationProfile[key].message;
        }
      });
    }
    setLocationErrors(localLocationErrors);

    if (
      Object.keys(localErrors).length === 0
      && Object.keys(localLocationErrors).length === 0
    ) {
      // do api call
      try {
        const response = await register({
          ...registerDetails,
          ...registerDetails.location,
        });
        toast.success(`Success: ${response.message}`, toastOptions);
        history.push('/login');
      } catch (error) {
        toast.error(createToastBody(error), toastOptions);
      }
    }
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginContainerLogo}>
        <Logo />
      </div>
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
              data-testid="radio-input"
            >
              <FormControlLabel
                value="c"
                control={<BlackRadio />}
                label="Customer"
                data-testid="radio-input-1"
              />
              <FormControlLabel
                value="r"
                control={<BlackRadio />}
                label="Restaurant"
                data-testid="radio-input-2"
              />
            </RadioGroup>
          </FormControl>
        </div>
        <div className={styles.loginInput}>
          <BlackTextField
            label={registerDetails.type === 'c' ? 'Name' : 'Restaurant Name'}
            type="text"
            id="name"
            onChange={handleChange}
            fullWidth
            required
            error={errors.name}
            helperText={errors.name}
            inputProps={{ 'data-testid': 'name-input' }}
          />
        </div>
        <div className={styles.loginInput}>
          <BlackTextField
            label="Email"
            type="email"
            onChange={handleChange}
            id="email"
            fullWidth
            required
            error={errors.email}
            helperText={errors.email}
            inputProps={{ 'data-testid': 'email-input' }}
          />
        </div>
        <div className={styles.loginInput}>
          <BlackTextField
            label="Password"
            type="password"
            onChange={handleChange}
            id="password"
            fullWidth
            required
            error={errors.password}
            helperText={errors.password}
            inputProps={{ 'data-testid': 'password-input' }}
          />
        </div>
        {registerDetails.type === 'r' && (
          <Location
            errors={locationErrors}
            onChange={(newLocation) => {
              handleChange({
                target: {
                  id: 'location',
                  value: newLocation,
                },
              });
            }}
            value={registerDetails.location}
          />
        )}
        <div className={styles.loginButton}>
          <BlackButton variant="contained" fullWidth onClick={onSubmit}>
            Register
          </BlackButton>
        </div>
        <div className={styles.loginNoAccount}>
          <Link
            onClick={() => dispatch(clearRegisterErrorsAction())}
            to="/login"
          >
            Already have an account?
          </Link>
        </div>
      </Paper>
    </div>
  );
}
