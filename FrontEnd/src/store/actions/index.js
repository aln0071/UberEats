import {
  CLEAR_USER_DETAILS,
  SET_USER_DETAILS,
  ADD_DISH,
  SET_DISHES,
} from './types';

export const loginAction = (userDetails) => ({
  type: SET_USER_DETAILS,
  payload: userDetails,
});

export const updateUserDetails = (userDetails) => ({
  type: SET_USER_DETAILS,
  payload: userDetails,
});

export const logoutAction = () => ({
  type: CLEAR_USER_DETAILS,
});

export const addDishAction = () => {
  const dishLayout = {
    name: '',
    restaurantid: '',
    dishname: '',
    description: '',
    category: 1,
    price: 0,
  };
  return {
    type: ADD_DISH,
    payload: dishLayout,
  };
};

export const setDishesAction = (dishes) => ({
  type: SET_DISHES,
  payload: dishes,
});
