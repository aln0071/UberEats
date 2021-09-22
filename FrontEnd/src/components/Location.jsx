import {
  MenuItem,
  Select,
  InputLabel,
  TextareaAutosize,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import styles from '../styles.scss';
import { BlackFormControl, BlackTextField } from '../utils';
import { getCities, getCountries, getStates } from '../utils/endpoints';

export default function Location() {
  const defaultValues = {
    country: '',
    state: '',
    city: '',
    location: '',
    zip: '',
  };

  const [location, setLocation] = useState(defaultValues);

  const getMap = (values = [], code, label) => values.map((value) => (
    <MenuItem value={value[code]}>{value[label]}</MenuItem>
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
    const { value } = e.target;
    switch (id) {
      case 'country':
        setLocation({
          ...defaultValues,
          [id]: value,
        });
        fetchStateList(value);
        break;
      case 'state':
        setLocation({
          ...defaultValues,
          country: location.country,
          [id]: value,
        });
        fetchCityList(value);
        break;
      default:
        setLocation({
          ...location,
          [id]: value,
        });
    }
  };

  useEffect(fetchCountryList, []);

  return (
    <div>
      <div className={styles.loginInput}>
        <BlackFormControl fullWidth>
          <InputLabel required>Country</InputLabel>
          <Select
            onChange={(e) => handleChange(e, 'country')}
            label="Country"
            value={location.country}
          >
            {getMap(countries, 'countrycode', 'country')}
          </Select>
        </BlackFormControl>
      </div>
      {location.country !== '' && (
        <>
          <div className={styles.loginInput}>
            <BlackFormControl fullWidth>
              <InputLabel required>State</InputLabel>
              <Select
                onChange={(e) => handleChange(e, 'state')}
                label="State"
                value={location.state}
              >
                {getMap(states, 'statecode', 'state')}
              </Select>
            </BlackFormControl>
          </div>
          {location.state !== '' && (
            <>
              <div className={styles.loginInput}>
                <BlackFormControl fullWidth>
                  <InputLabel required>City</InputLabel>
                  <Select
                    onChange={(e) => handleChange(e, 'city')}
                    label="City"
                    value={location.city}
                  >
                    {getMap(cities, 'citycode', 'city')}
                  </Select>
                </BlackFormControl>
              </div>
              <div className={styles.loginInput}>
                <BlackFormControl fullWidth>
                  <TextareaAutosize
                    placeholder="Address"
                    minRows={3}
                    onChange={(e) => handleChange(e, 'location')}
                    value={location.location}
                  />
                </BlackFormControl>
              </div>
              <div className={styles.loginInput}>
                <BlackTextField
                  label="Zip Code"
                  type="text"
                  fullWidth
                  required
                  value={location.zip}
                  onChange={(e) => handleChange(e, 'location')}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
