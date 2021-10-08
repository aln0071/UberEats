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

export const updateProfile = (params, pictures = []) => {
  console.log(params);
  const url = `${baseUrl}${urls.updateProfile}`;
  const formData = new FormData();
  pictures.forEach((pic) => {
    formData.append('image', pic);
  });
  Object.keys(params).forEach((key) => {
    if (params[key] !== null) formData.append(key, params[key]);
  });
  return fetch(url, {
    method: 'POST',
    body: formData,
  }).then(handleResponse);
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
  const { pictures } = dish;
  const formdata = new FormData();
  pictures.forEach((pic) => {
    formdata.append('image', pic);
  });
  Object.keys(dish).forEach((key) => {
    if (key === 'pictures') {
      return;
    }
    formdata.append(key, dish[key]);
  });
  const url = `${baseUrl}${urls.addDish}`;
  // return post(url, dish).then(handleResponse);
  return fetch(url, {
    method: 'POST',
    body: formdata,
  }).then(handleResponse);
};

export const getAllDishes = ({ userid }) => {
  const url = `${baseUrl}${urls.getDishes}?restaurantid=${userid}`;
  return get(url).then(handleResponse);
};

export const getAllRestaurants = ({ citycode, statecode }) => {
  const url = `${baseUrl}${urls.getAllRestaurants}?citycode=${citycode}&statecode=${statecode}`;
  return get(url).then(handleResponse);
};

export const getAllRelatedAddresses = ({ userid }) => {
  const url = `${baseUrl}${urls.getAllRelatedAddresses}?userid=${userid}`;
  return get(url).then(handleResponse);
};

export const uploadFilesEndpoint = (files) => {
  const formdata = new FormData();
  files.forEach((file) => {
    formdata.append('image', file);
  });
  formdata.append('username', 'alan');
  const url = `${baseUrl}${urls.uploadImage}`;
  return fetch(url, {
    method: 'POST',
    body: formdata,
  }).then(handleResponse);
};

export const placeOrder = (params) => {
  const url = `${baseUrl}${urls.placeOrder}`;
  return post(url, { ...params }).then(handleResponse);
};

export const getOrderList = (userid, type) => {
  const url = `${baseUrl}${urls.getOrderList}?userid=${userid}&type=${type}`;
  return get(url).then(handleResponse);
};

export const cancelOrder = (orderid) => {
  const url = `${baseUrl}${urls.updateOrder}`;
  return post(url, {
    type: 'cancel',
    orderid,
  }).then(handleResponse);
};
