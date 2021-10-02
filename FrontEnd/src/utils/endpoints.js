import { baseUrl, urls } from './constants';
import { post, get } from './request';

const handleResponse = async (response) => {
  let data = null;
  try {
    data = await response.json();
  } catch (error) {
    if (response.status !== 200 && response.status !== 204) throw new Error(response.statusText);
    else return { status: response.status, message: response.statusText };
  }
  if (response.status !== 200 && response.status !== 204) {
    throw new Error(data.message);
  }
  return data;
};

export const login = (username, password) => {
  const url = `${baseUrl}${urls.login}`;
  return post(url, { username, password }).then(handleResponse);
};

export const register = (params) => {
  const url = `${baseUrl}${urls.register}`;
  return post(url, params).then(handleResponse);
};

export const updateProfile = (params) => {
  const url = `${baseUrl}${urls.updateProfile}`;
  return post(url, params).then(handleResponse);
};

export const getCountries = () => {
  const url = `${baseUrl}${urls.countries}`;
  return get(url).then(handleResponse);
};

export const getStates = (countrycode) => {
  let url = `${baseUrl}${urls.states}`;
  if (countrycode) {
    url = `${url}?countrycode=${countrycode}`;
  }
  return get(url).then(handleResponse);
};

export const getCities = (statecode) => {
  let url = `${baseUrl}${urls.cities}`;
  if (statecode) {
    url = `${url}?statecode=${statecode}`;
  }
  return get(url).then(handleResponse);
};

export const updateDishes = (dishes) => {
  const url = `${baseUrl}${urls.updateDishes}`;
  return post(url, dishes).then(handleResponse);
};

export const addDish = (dish) => {
  const url = `${baseUrl}${urls.addDish}`;
  return post(url, dish).then(handleResponse);
};

export const getAllDishes = ({ userid }) => {
  const url = `${baseUrl}${urls.getDishes}?restaurantid=${userid}`;
  return get(url).then(handleResponse);
};

export const getAllRestaurants = ({ citycode, statecode }) => {
  const url = `${baseUrl}${urls.getAllRestaurants}?citycode=${citycode}&&statecode=${statecode}`;
  return get(url).then(handleResponse);
};
