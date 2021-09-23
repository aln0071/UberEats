import { baseUrl, urls } from './constants';
import { post, get } from './request';

const handleResponse = async (response) => {
  let data = null;
  try {
    data = await response.json();
  } catch (error) {
    if (response.status !== 200) throw new Error(response.statusText);
    else return { status: response.status, message: response.statusText };
  }
  if (response.status !== 200) {
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

export const getCountries = () => {
  const url = `${baseUrl}${urls.countries}`;
  return get(url).then(handleResponse);
};

export const getStates = (countrycode) => {
  const url = `${baseUrl}${urls.states}?countrycode=${countrycode}`;
  return get(url).then(handleResponse);
};

export const getCities = (statecode) => {
  const url = `${baseUrl}${urls.cities}?statecode=${statecode}`;
  return get(url).then(handleResponse);
};
