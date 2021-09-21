import { baseUrl, urls } from './constants';
import post from './request';

const handleResponse = async (response) => {
  const data = await response.json();
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
