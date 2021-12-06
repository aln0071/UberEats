import { SET_COUNTRIES, SET_CITIES, SET_STATES } from './types';
import runQuery from '../../graphql/runQuery';
import getCountries from '../../graphql/queries/getCountries';
import getStates from '../../graphql/queries/getStates';
import getCities from '../../graphql/queries/getCities';

const setCountryListAction = (countryList) => ({
  type: SET_COUNTRIES,
  payload: countryList,
});

const setCityListAction = (cityList) => ({
  type: SET_CITIES,
  payload: cityList,
});

const setStateListAction = (stateList) => ({
  type: SET_STATES,
  payload: stateList,
});

export const getCountriesAction = () => async (dispatch) => {
  try {
    const { data } = await runQuery(getCountries());
    const countryList = data.Countries;
    dispatch(setCountryListAction(countryList));
  } catch (error) {
    console.log(error);
    dispatch(setCountryListAction([]));
  }
};

export const getStatesAction = (countrycode) => async (dispatch) => {
  try {
    const { data } = await runQuery(getStates(countrycode));
    const stateList = data.States;
    dispatch(setStateListAction(stateList));
  } catch (error) {
    console.log(error);
    dispatch(setStateListAction([]));
  }
};

export const getCitiesAction = (statecode) => async (dispatch) => {
  try {
    const { data } = await runQuery(getCities(statecode));
    const cityList = data.Cities;
    dispatch(setCityListAction(cityList));
  } catch (error) {
    console.log(error);
    dispatch(setCityListAction([]));
  }
};
