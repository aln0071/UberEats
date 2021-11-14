import { SET_COUNTRIES, SET_CITIES, SET_STATES } from './types';
import { getCountries, getStates, getCities } from '../../utils/endpoints';

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
    const countryList = await getCountries();
    dispatch(setCountryListAction(countryList));
  } catch (error) {
    console.log(error);
    dispatch(setCountryListAction([]));
  }
};

export const getStatesAction = (countrycode) => async (dispatch) => {
  try {
    const stateList = await getStates(countrycode);
    dispatch(setStateListAction(stateList));
  } catch (error) {
    console.log(error);
    dispatch(setStateListAction([]));
  }
};

export const getCitiesAction = (statecode) => async (dispatch) => {
  try {
    const cityList = await getCities(statecode);
    dispatch(setCityListAction(cityList));
  } catch (error) {
    console.log(error);
    dispatch(setCityListAction([]));
  }
};
