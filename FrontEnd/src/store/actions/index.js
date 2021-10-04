import {
  CLEAR_USER_DETAILS,
  SET_USER_DETAILS,
  ADD_DISH,
  SET_DISHES,
  UPDATE_DISH,
  SET_RESTAURANTS,
  SET_CURRENT_TAB,
  SET_CURRENT_RESTAURANT,
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

export const setRestaurantsAction = (restaurants) => ({
  type: SET_RESTAURANTS,
  payload: restaurants,
});

export const setCurrentTabAction = (tabid) => ({
  type: SET_CURRENT_TAB,
  payload: tabid,
});

export const setCurrentRestaurantAction = (restaurantid) => ({
  type: SET_CURRENT_RESTAURANT,
  payload: restaurantid,
});
