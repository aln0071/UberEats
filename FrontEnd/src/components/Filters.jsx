import React, { useEffect, useState } from 'react';
import { RadioGroup, Radio, ALIGN } from 'baseui/radio';
import { useSelector, useDispatch } from 'react-redux';
import { Select } from 'baseui/select';
import { addFiltersAction } from '../store/actions';
import { getCountries, getCities, getStates } from '../utils/endpoints';

export default function Filters() {
  const {
    deliverymode, country, state, city,
  } = useSelector((s) => s.filters);
  const dispatch = useDispatch();

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
    console.log(countrycode);
    try {
      const stateList = await getStates(countrycode);
      setStates(stateList);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCityList = async (statecode) => {
    console.log(statecode);
    try {
      const cityList = await getCities(statecode);
      setCities(cityList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCountryList();
  }, []);

  return (
    <div>
      <hr />
      Mode of delivery:
      <RadioGroup
        value={deliverymode}
        onChange={(e) => {
          dispatch(
            addFiltersAction({
              deliverymode: e.currentTarget.value,
            }),
          );
        }}
        name="number"
        align={ALIGN.vertical}
      >
        <Radio value="both">Both</Radio>
        <Radio value="delivery">Delivery</Radio>
        <Radio value="pickup">Pickup</Radio>
      </RadioGroup>
      <hr />
      Location:
      <Select
        options={countries.map((cn) => ({
          label: cn.country,
          id: cn.countrycode,
        }))}
        value={country}
        placeholder="Select country"
        onChange={(params) => {
          dispatch(
            addFiltersAction({
              country: params.value,
              city: [],
              state: [],
            }),
          );
          fetchStateList(params.value[0].id);
        }}
      />
      <br />
      {country.length > 0 && (
        <Select
          options={states.map((s) => ({ label: s.state, id: s.statecode }))}
          value={state}
          placeholder="Select state"
          onChange={(params) => {
            dispatch(
              addFiltersAction({
                state: params.value,
                city: [],
              }),
            );
            fetchCityList(params.value[0].id);
          }}
        />
      )}
      <br />
      {state.length > 0 && (
        <Select
          options={cities.map((c) => ({ label: c.city, id: c.citycode }))}
          value={city}
          placeholder="Select city"
          onChange={(params) => {
            dispatch(
              addFiltersAction({
                city: params.value,
              }),
            );
          }}
        />
      )}
      <hr />
    </div>
  );
}
