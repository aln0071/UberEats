import runQuery from '../graphql/runQuery';
import { baseUrl, urls } from './constants';
import { post, get } from './request';
import graphqlLogin from '../graphql/queries/login';
import graphqlGetAddresses from '../graphql/queries/getAddresses';
import graphqlGetDishes from '../graphql/queries/getDishes';
import graphqlRegister from '../graphql/mutations/register';
import graphqlUpdateProfile from '../graphql/mutations/updateProfile';
import graphqlAddDish from '../graphql/mutations/addDish';
import graphqlUpdateDish from '../graphql/mutations/updateDish';
import graphqlDeleteDish from '../graphql/mutations/deleteDish';
import graphqlPlaceOrder from '../graphql/mutations/placeOrder';
import runMutation from '../graphql/runMutation';

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

const adapter = (dataPoint) => ({ data, errors }) => {
  if (errors) {
    throw new Error(errors[0].message);
  }
  return data[dataPoint];
};

const messageAdapter = (message) => ({ message });

export const login = (username, password) => {
  const loginAdapter = adapter('Login');
  return runQuery(graphqlLogin(username, password)).then(loginAdapter);
};

export const register = async (params) => {
  const registerAdapter = adapter('register');
  return runMutation(graphqlRegister(params)).then(registerAdapter);
};

export const updateProfile = ({
  userid,
  dob,
  restaurantid,
  email,
  name,
  city,
  citycode,
  state,
  statecode,
  country,
  countrycode,
  location,
  zip,
  pictures,
  nickname,
  phone,
  description,
  deliverymode,
  hoursfrom,
  hoursto,
}) => {
  // const url = `${baseUrl}${urls.updateProfile}`;
  // const formData = new FormData();
  // pictures.forEach((pic) => {
  //   formData.append('image', pic);
  // });
  // Object.keys(params).forEach((key) => {
  //   if (key === 'pictures') {
  //     formData.append(key, JSON.stringify(params[key] || []));
  //   } else if (params[key] !== null) formData.append(key, params[key]);
  // });
  // return fetch(url, {
  //   method: 'POST',
  //   body: formData,
  // }).then(handleResponse);
  const updateProfileAdapter = adapter('updateProfile');
  return runMutation(
    graphqlUpdateProfile({
      userid,
      restaurantid,
      email,
      name,
      city,
      citycode,
      state,
      statecode,
      country,
      countrycode,
      location,
      zip,
      pictures,
      nickname,
      phone,
      description,
      deliverymode,
      hoursfrom,
      hoursto,
      dob,
    }),
  ).then(updateProfileAdapter);
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

export const deleteDish = (dishid) => {
  // const url = `${baseUrl}${urls.deleteDish}?dishid=${dishid}`;
  // return fetch(url, {
  //   method: 'DELETE',
  // }).then(handleResponse);
  const deleteDishAdapter = adapter('deleteDish');
  return runMutation(graphqlDeleteDish(dishid)).then(deleteDishAdapter);
};

export const addDish = ({
  dishname,
  description,
  category,
  price,
  restaurantid,
  pictures,
}) => {
  // const { pictures } = dish;
  // const formdata = new FormData();
  // pictures.forEach((pic) => {
  //   formdata.append('image', pic);
  // });
  // Object.keys(dish).forEach((key) => {
  //   if (key === 'pictures') {
  //     return;
  //   }
  //   formdata.append(key, dish[key]);
  // });
  // const url = `${baseUrl}${urls.addDish}`;
  // // return post(url, dish).then(handleResponse);
  // return fetch(url, {
  //   method: 'POST',
  //   body: formdata,
  // }).then(handleResponse);
  const addDishAdapter = adapter('addDish');
  return runMutation(
    graphqlAddDish({
      dishname,
      description,
      category,
      price,
      restaurantid,
      pictures,
    }),
  )
    .then(addDishAdapter)
    .then(messageAdapter);
};

export const updateDish = ({
  dishid,
  dishname,
  description,
  category,
  price,
  restaurantid,
  pictures,
}) => {
  // const { pictures } = dish;
  // const formdata = new FormData();
  // pictures.forEach((pic) => {
  //   formdata.append('image', pic);
  // });
  // Object.keys(dish).forEach((key) => {
  //   if (key === 'pictures') {
  //     return;
  //   }
  //   formdata.append(key, dish[key]);
  // });
  // const url = `${baseUrl}${urls.updateDish}`;
  // return fetch(url, {
  //   method: 'POST',
  //   body: formdata,
  // }).then(handleResponse);
  const updateDishAdapter = adapter('updateDish');
  return runMutation(
    graphqlUpdateDish({
      dishid,
      dishname,
      description,
      category,
      price,
      restaurantid,
      pictures,
    }),
  )
    .then(updateDishAdapter)
    .then(messageAdapter);
};

export const getAllDishes = ({ userid }) => {
  // const url = `${baseUrl}${urls.getDishes}?restaurantid=${userid || ''}`;
  // return get(url).then(handleResponse);
  const dishAdapter = adapter('Dishes');
  return runQuery(graphqlGetDishes(userid || '')).then(dishAdapter);
};

export const getAllRestaurants = ({ citycode, statecode, countrycode }) => {
  const url = `${baseUrl}${urls.getAllRestaurants}?citycode=${
    citycode || ''
  }&statecode=${statecode || ''}&countrycode=${countrycode || ''}`;
  return get(url).then(handleResponse);
};

export const getAllRelatedAddresses = ({ userid }) => {
  // const url = `${baseUrl}${urls.getAllRelatedAddresses}?userid=${userid}`;
  // return get(url).then(handleResponse);
  const addressAdapter = adapter('Addresses');
  return runQuery(graphqlGetAddresses(userid)).then(addressAdapter);
};

export const uploadFilesEndpoint = (files) => {
  const formdata = new FormData();
  files.forEach((file) => {
    formdata.append('image', file);
  });
  const url = `${baseUrl}${urls.uploadImage}`;
  return fetch(url, {
    method: 'POST',
    body: formdata,
  }).then(handleResponse);
};

export const placeOrder = (params) => {
  // const url = `${baseUrl}${urls.placeOrder}`;
  // return post(url, { ...params }).then(handleResponse);
  // console.log(queryMaker(params));
  const placeOrderAdapter = adapter('placeOrder');
  return runMutation(graphqlPlaceOrder(params))
    .then(placeOrderAdapter)
    .then((orderid) => ({ orderid }));
};

export const getOrderList = (userid, type, ordersPerPage, startingIndex) => {
  const url = `${baseUrl}${urls.getOrderList}?userid=${userid}&type=${type}&index=${startingIndex}&offset=${ordersPerPage}`;
  return get(url).then(handleResponse);
};

export const updateOrder = (orderid, type) => {
  const url = `${baseUrl}${urls.updateOrder}`;
  return post(url, {
    type,
    orderid,
  }).then(handleResponse);
};

export const toggleFavorite = ({ userid, restaurantid, isFavorite }) => {
  const url = `${baseUrl}${urls.toggleFavorite}`;
  return post(url, {
    restaurantid,
    userid,
    isFavorite,
  }).then(handleResponse);
};

export const getFavorites = (userid) => {
  const url = `${baseUrl}${urls.getFavorites}?userid=${userid}`;
  return get(url).then(handleResponse);
};
