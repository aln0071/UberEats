import {
  MenuItem,
  Select,
  InputLabel,
  TextareaAutosize,
  FormHelperText,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles.scss';
import { BlackFormControl, BlackTextField } from '../utils';
import { getCities, getCountries, getStates } from '../utils/endpoints';

export default function Location({ errors, onChange, value }) {
  const defaultValues = {
    country: '',
    countrycode: '',
    state: '',
    statecode: '',
    city: '',
    citycode: '',
    location: '',
    zip: '',
  };

  const getMap = (values = [], code, label) => values.map((val) => (
    <MenuItem key={`${code}${val[code]}`} value={val[code]} name={val[label]}>
      {val[label]}
    </MenuItem>
  ));

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const fetchCountryList = async () => {
    try {
      const countryList = await getCountries();
      setCountries(countryList);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStateList = async (countrycode) => {
    try {
      const stateList = await getStates(countrycode);
      setStates(stateList);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCityList = async (statecode) => {
    try {
      const cityList = await getCities(statecode);
      setCities(cityList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e, id) => {
    const newValue = e.target.value;
    switch (id) {
      case 'country': {
        const { country } = countries.find(
          (c) => c.countrycode === newValue,
        );
        onChange({
          ...defaultValues,
          countrycode: newValue,
          country,
        });
        fetchStateList(newValue);
        break;
      }
      case 'state': {
        const { state } = states.find((c) => c.statecode === newValue);
        onChange({
          ...defaultValues,
          country: value.country,
          countrycode: value.countrycode,
          statecode: newValue,
          state,
        });
        fetchCityList(newValue);
        break;
      }
      case 'city': {
        const { city } = cities.find((c) => c.citycode === newValue);
        onChange({
          ...value,
          city,
          citycode: newValue,
        });
        break;
      }
      default:
        onChange({
          ...value,
          [id]: newValue,
        });
    }
  };

  useEffect(fetchCountryList, []);

  return (
    <div>
      <div className={styles.loginInput}>
        <BlackFormControl fullWidth error={errors.country}>
          <InputLabel required>Country</InputLabel>
          <Select
            onChange={(e) => handleChange(e, 'country')}
            label="Country"
            value={value.countrycode}
          >
            {getMap(countries, 'countrycode', 'country')}
          </Select>
          {errors.country && <FormHelperText>{errors.country}</FormHelperText>}
        </BlackFormControl>
      </div>
      {value.country !== '' && (
        <>
          <div className={styles.loginInput}>
            <BlackFormControl fullWidth error={errors.state}>
              <InputLabel required>State</InputLabel>
              <Select
                onChange={(e) => handleChange(e, 'state')}
                label="State"
                value={value.statecode}
              >
                {getMap(states, 'statecode', 'state')}
              </Select>
              {errors.state && <FormHelperText>{errors.state}</FormHelperText>}
            </BlackFormControl>
          </div>
          {value.state !== '' && (
            <>
              <div className={styles.loginInput}>
                <BlackFormControl fullWidth error={errors.citycode}>
                  <InputLabel required>City</InputLabel>
                  <Select
                    onChange={(e) => handleChange(e, 'city')}
                    label="City"
                    value={value.citycode}
                  >
                    {getMap(cities, 'citycode', 'city')}
                  </Select>
                  {errors.citycode && (
                    <FormHelperText>{errors.citycode}</FormHelperText>
                  )}
                </BlackFormControl>
              </div>
              <div className={styles.loginInput}>
                <BlackFormControl fullWidth error={errors.location}>
                  <TextareaAutosize
                    placeholder="Address"
                    minRows={3}
                    onChange={(e) => handleChange(e, 'location')}
                    value={value.location}
                  />
                  {errors.location && (
                    <FormHelperText>{errors.location}</FormHelperText>
                  )}
                </BlackFormControl>
              </div>
              <div className={styles.loginInput}>
                <BlackTextField
                  label="Zip Code"
                  type="number"
                  fullWidth
                  required
                  value={value.zip}
                  onChange={(e) => handleChange(e, 'zip')}
                  error={errors.zip}
                  helperText={errors.zip}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

Location.defaultProps = {
  errors: {},
  onChange: () => {},
  value: {
    country: '',
    countrycode: '',
    state: '',
    statecode: '',
    city: '',
    citycode: '',
    location: '',
    zip: '',
  },
};

Location.propTypes = {
  errors: PropTypes.oneOfType([PropTypes.object]),
  value: PropTypes.oneOfType([PropTypes.object]),
  onChange: PropTypes.func,
};
