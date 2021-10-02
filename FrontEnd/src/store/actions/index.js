import {
  CLEAR_USER_DETAILS,
  SET_USER_DETAILS,
  ADD_DISH,
  SET_DISHES,
  UPDATE_DISH,
  SET_MESSAGE,
  CLEAR_MESSAGE,
} from './types';

export const loginAction = (userDetails) => ({
  type: SET_USER_DETAILS,
  payload: userDetails,
});

export const logoutAction = () => ({
  type: CLEAR_USER_DETAILS,
});

// let tempdishid = 0;

export const addDishAction = () => {
  const dishLayout = {
    // dishid: `temp${tempdishid++}`,
    dishname: '',
    description: '',
    category: 1,
    price: 0,
  };

  return (dispatch, getState) => {
    const { user } = getState();
    dishLayout.restaurantid = user.userid;
    dispatch({
      type: ADD_DISH,
      payload: dishLayout,
    });
  };
};

export const updateUserDetails = (userDetails) => ({
  type: SET_USER_DETAILS,
  payload: userDetails,
});

export const updateDishAction = (index, value) => ({
  type: UPDATE_DISH,
  payload: {
    index,
    value,
  },
});

export const setDishesAction = (dishes) => ({
  type: SET_DISHES,
  payload: dishes,
});

export const setMessageAction = (message, type) => ({
  type: SET_MESSAGE,
  payload: {
    message,
    type,
  },
});

export const clearMessageAction = () => ({
  type: CLEAR_MESSAGE,
});
