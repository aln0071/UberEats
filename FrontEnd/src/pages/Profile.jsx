import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import { toast } from 'react-toastify';
import { updateUserDetails } from '../store/actions';
import {
  BlackTextField,
  BlackFormControl,
  BlackButton,
  toastOptions,
  createToastBody,
} from '../utils';
import {
  getCountries,
  getStates,
  getCities,
  updateProfile,
} from '../utils/endpoints';
import { validations, isValid } from '../utils/validations';
import FileUpload from '../components/FileUpload';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& .MuiFormControl-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Profile() {
  const profileData = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const classes = useStyles();

  const getMap = (values = [], code, label) => values.map((val) => (
    <MenuItem key={`${code}${val[code]}`} value={val[code]}>
      {val[label]}
    </MenuItem>
  ));

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const fetchAllLocations = async () => {
    try {
      const [countryList, stateList, cityList] = await Promise.all([
        getCountries(),
        getStates(),
        getCities(),
      ]);
      setCountries(countryList);
      setStates(stateList);
      setCities(cityList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllLocations();
  }, []);

  const handleChange = (event) => {
    const { id } = event.target;
    dispatch(
      updateUserDetails({
        ...profileData,
        [id]: event.target.value,
      }),
    );
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = async () => {
    const localErrors = {};
    const customerProfile = validations.profile.customer;
    Object.keys(customerProfile).forEach((key) => {
      if (
        !isValid(
          customerProfile[key].regex,
          profileData[key] === null ? '' : profileData[key],
        )
      ) {
        localErrors[key] = customerProfile[key].message;
      }
    });
    setErrors(localErrors);
    console.log(localErrors);
    console.log(errors);
    if (Object.keys(localErrors).length === 0) {
      // call api
      try {
        const response = await updateProfile(profileData);
        toast.success(`Success: ${response.message}`, toastOptions);
      } catch (error) {
        console.log(error);
        toast.error(createToastBody(error), toastOptions);
      }
    } else {
      toast.error('Please enter valid data!', toastOptions);
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <BlackTextField
          required
          id="name"
          label="Name"
          value={profileData.name}
          onChange={handleChange}
          type="text"
        />
        <BlackTextField
          id="nickName"
          label="Nick Name"
          value={profileData.nickname}
          onChange={handleChange}
          type="text"
        />
        <BlackTextField
          required
          id="email"
          label="Email"
          value={profileData.email}
          onChange={handleChange}
          type="email"
        />
        <BlackTextField
          id="dob"
          label="Date of Birth"
          value={profileData.dob || ''}
          type="date"
          onChange={handleChange}
        />
      </div>
      <div>
        <BlackFormControl>
          <InputLabel required>City</InputLabel>
          <Select
            onChange={(e) => {
              const city = cities.find((c) => c.citycode === e.target.value);
              dispatch(updateUserDetails(city));
            }}
            label="City"
            value={profileData.citycode}
          >
            {getMap(
              cities.filter((city) => city.statecode === profileData.statecode),
              'citycode',
              'city',
            )}
          </Select>
        </BlackFormControl>
        <BlackFormControl>
          <InputLabel required>State</InputLabel>
          <Select
            onChange={(e) => {
              const s = states.find(
                (state) => state.statecode === e.target.value,
              );
              dispatch(updateUserDetails(s));
            }}
            label="State"
            value={profileData.statecode}
          >
            {getMap(
              states.filter(
                (state) => state.countrycode === profileData.countrycode,
              ),
              'statecode',
              'state',
            )}
          </Select>
        </BlackFormControl>
        <BlackFormControl>
          <InputLabel required>Country</InputLabel>
          <Select
            onChange={(e) => {
              const country = countries.find(
                (cn) => cn.countrycode === e.target.value,
              );
              dispatch(updateUserDetails(country));
            }}
            label="Country"
            value={profileData.countrycode}
          >
            {getMap(countries, 'countrycode', 'country')}
          </Select>
        </BlackFormControl>
        <BlackTextField
          id="phone"
          label="Phone"
          value={profileData.phone}
          type="text"
          onChange={handleChange}
        />
      </div>
      <div>
        <BlackTextField
          id="about"
          label="About"
          multiline
          maxRows={4}
          value={profileData.about}
          onChange={handleChange}
        />
        <BlackTextField
          required
          id="location"
          label="Address"
          multiline
          maxRows={4}
          value={profileData.location}
          onChange={handleChange}
        />
        <BlackTextField
          required
          id="zip"
          label="Zip Code"
          value={profileData.zip}
          type="number"
          onChange={handleChange}
        />
      </div>
      <div>
        <FileUpload />
      </div>
      <div>
        <BlackButton onClick={handleSubmit}>Update Profile</BlackButton>
      </div>
    </form>
  );
}
