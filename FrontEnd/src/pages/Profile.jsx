import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import {
  Select, MenuItem, InputLabel, Input,
} from '@material-ui/core';
import { toast } from 'react-toastify';
import { FileUploader } from 'baseui/file-uploader';
import { FormControl } from 'baseui/form-control';
import { Button } from 'baseui/button';
import { Grid, Cell } from 'baseui/layout-grid';
import { updateUserDetails } from '../store/actions';
import {
  BlackTextField,
  BlackFormControl,
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
import { getAllRestaurantsAction } from '../store/actions/restaurants';

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

  const [pictures, setPictures] = React.useState([]);

  const classes = useStyles();

  const getMap = (values = [], code, label) => values.map((val) => (
    <MenuItem key={`${code}${val[code]}`} value={val[code]}>
      {val[label]}
    </MenuItem>
  ));

  const deliveryModes = [
    {
      label: 'Both Delivery & Pickup',
      value: 1,
    },
    {
      label: 'Delivery',
      value: 2,
    },
    {
      label: 'Pickup',
      value: 3,
    },
  ];

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
        const response = await updateProfile(profileData, pictures);
        toast.success(`Success: ${response.message}`, toastOptions);
        console.log(response);
        dispatch(updateUserDetails(response.data));
      } catch (error) {
        console.log(error);
        toast.error(createToastBody(error), toastOptions);
      } finally {
        dispatch(getAllRestaurantsAction());
      }
    } else {
      toast.error('Please enter valid data!', toastOptions);
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid gridGaps={[2, 6, 12]}>
        <Cell span={4}>
          <BlackTextField
            required
            id="name"
            label="Name"
            value={profileData.name}
            onChange={handleChange}
            type="text"
          />
        </Cell>

        <Cell span={4}>
          <BlackTextField
            id="nickName"
            label="Nick Name"
            value={profileData.nickname}
            onChange={handleChange}
            type="text"
          />
        </Cell>

        <Cell span={4}>
          <BlackTextField
            required
            id="email"
            label="Email"
            value={profileData.email}
            onChange={handleChange}
            type="email"
          />
        </Cell>

        {profileData.type === 'c' && (
          <Cell span={4}>
            <BlackTextField
              id="dob"
              label="Date of Birth"
              value={profileData.dob || ''}
              type="date"
              onChange={handleChange}
            />
          </Cell>
        )}

        <Cell span={4}>
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
                cities.filter(
                  (city) => city.statecode === profileData.statecode,
                ),
                'citycode',
                'city',
              )}
            </Select>
          </BlackFormControl>
        </Cell>

        <Cell span={4}>
          <BlackFormControl>
            <InputLabel required>State</InputLabel>
            <Select
              onChange={(e) => {
                const s = states.find(
                  (state) => state.statecode === e.target.value,
                );
                dispatch(updateUserDetails({ ...s, city: '', citycode: '' }));
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
        </Cell>

        <Cell span={4}>
          <BlackFormControl>
            <InputLabel required>Country</InputLabel>
            <Select
              onChange={(e) => {
                const country = countries.find(
                  (cn) => cn.countrycode === e.target.value,
                );
                dispatch(
                  updateUserDetails({
                    ...country,
                    state: '',
                    statecode: '',
                    city: '',
                    citycode: '',
                  }),
                );
              }}
              label="Country"
              value={profileData.countrycode}
            >
              {getMap(countries, 'countrycode', 'country')}
            </Select>
          </BlackFormControl>
        </Cell>

        <Cell span={4}>
          <BlackTextField
            id="phone"
            label="Phone"
            value={profileData.phone}
            type="text"
            onChange={handleChange}
          />
        </Cell>

        <Cell span={4}>
          <BlackTextField
            id="description"
            label="About"
            multiline
            maxRows={4}
            value={profileData.description}
            onChange={handleChange}
          />
        </Cell>

        <Cell span={4}>
          <BlackTextField
            required
            id="location"
            label="Address"
            multiline
            maxRows={4}
            value={profileData.location}
            onChange={handleChange}
          />
        </Cell>

        <Cell span={4}>
          <BlackTextField
            required
            id="zip"
            label="Zip Code"
            value={profileData.zip}
            type="number"
            onChange={handleChange}
          />
        </Cell>
        {profileData.type === 'r' && (
          <>
            <Cell span={4}>
              <BlackFormControl>
                <InputLabel required>Delivery Mode</InputLabel>
                <Select
                  onChange={(e) => {
                    dispatch(
                      updateUserDetails({ deliverymode: e.target.value }),
                    );
                  }}
                  label="Delivery Mode"
                  value={profileData.deliverymode}
                >
                  {getMap(deliveryModes, 'value', 'label')}
                </Select>
              </BlackFormControl>
            </Cell>

            <Cell span={4}>
              <BlackFormControl>
                <InputLabel>Open from</InputLabel>
                <Input
                  id="hoursfrom"
                  type="time"
                  value={profileData.hoursfrom}
                  onChange={handleChange}
                />
              </BlackFormControl>
            </Cell>

            <Cell span={4}>
              <BlackFormControl>
                <InputLabel>Closes at</InputLabel>
                <Input
                  id="hoursto"
                  type="time"
                  value={profileData.hoursto}
                  onChange={handleChange}
                />
              </BlackFormControl>
            </Cell>
          </>
        )}

        <Cell span={12}>
          <FormControl label="Pictures">
            <span>
              {pictures.map((pic) => (
                <span style={{ marginRight: '10px' }}>{pic.path}</span>
              ))}
              <FileUploader
                multiple={profileData.type === 'r'}
                onDrop={(acceptedFiles, rejectedFiles) => {
                  console.log(rejectedFiles);
                  setPictures(acceptedFiles);
                }}
                accept=".jpg,.png"
              />
            </span>
          </FormControl>
        </Cell>

        <Cell span={4}>
          <Button onClick={handleSubmit}>Update Profile</Button>
        </Cell>
      </Grid>
    </form>
  );
}
