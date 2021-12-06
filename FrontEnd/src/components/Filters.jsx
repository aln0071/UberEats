import React, { useEffect, useState } from 'react';
import { RadioGroup, Radio, ALIGN } from 'baseui/radio';
import { useSelector, useDispatch } from 'react-redux';
import { Select } from 'baseui/select';
import { addFiltersAction } from '../store/actions';
import runQuery from '../graphql/runQuery';
import getCountries from '../graphql/queries/getCountries';
import getStates from '../graphql/queries/getStates';
import getCities from '../graphql/queries/getCities';

export default function Filters() {
  const {
    deliverymode, country, state, city, mealtype,
  } = useSelector(
    (s) => s.filters,
  );

  const currentTab = useSelector((s) => s.currentTab);
  const dispatch = useDispatch();

  if (currentTab === 4) {
    return (
      <div>
        <hr />
        Type:
        <RadioGroup
          value={mealtype}
          onChange={(e) => {
            dispatch(
              addFiltersAction({
                mealtype: e.currentTarget.value,
              }),
            );
          }}
          name="number"
          align={ALIGN.vertical}
        >
          <Radio value="all">All</Radio>
          <Radio value="veg">Veg</Radio>
          <Radio value="non-veg">Non-Veg</Radio>
          <Radio value="vegan">Vegan</Radio>
        </RadioGroup>
        <hr />
      </div>
    );
  }

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const fetchCountryList = async () => {
    try {
      const { data } = await runQuery(getCountries());
      const countryList = data.Countries;
      setCountries(countryList);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchStateList = async (countrycode) => {
    try {
      const { data } = await runQuery(getStates(countrycode));
      const stateList = data.States;
      setStates(stateList);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCityList = async (statecode) => {
    try {
      const { data } = await runQuery(getCities(statecode));
      const cityList = data.Cities;
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
      Type:
      <RadioGroup
        value={mealtype}
        onChange={(e) => {
          dispatch(
            addFiltersAction({
              mealtype: e.currentTarget.value,
            }),
          );
        }}
        name="number"
        align={ALIGN.vertical}
      >
        <Radio value="all">All</Radio>
        <Radio value="veg">Veg</Radio>
        <Radio value="non-veg">Non-Veg</Radio>
        <Radio value="vegan">Vegan</Radio>
      </RadioGroup>
      <hr />
    </div>
  );
}
