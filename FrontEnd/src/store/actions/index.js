import {
  CLEAR_USER_DETAILS,
  SET_USER_DETAILS,
  ADD_DISH,
  SET_DISHES,
  UPDATE_DISH,
  SET_RESTAURANTS,
  SET_CURRENT_TAB,
  SET_CURRENT_RESTAURANT,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
  CLEAR_CART,
  SET_ADDRESS_LIST,
  HIDE_ORDER_CONFIRM_MODAL,
  SHOW_ORDER_CONFIRM_MODAL,
  SHOW_ORDER_DETAILS_MODAL,
  HIDE_ORDER_DETAILS_MODAL,
  SET_FAVORITES_LIST,
  ADD_FAVORITE,
  SET_FILTERS,
  REMOVE_FILTERS,
  ADD_FILTERS,
  CLEAR_FILTERS,
  SHOW_ADD_DISH_MODAL,
  HIDE_ADD_DISH_MODAL,
  UPDATE_DISH_DATA_IN_MODAL,
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

export const updateDishAction = (dish) => ({
  type: UPDATE_DISH,
  payload: dish,
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

export const addToCartAction = (dish) => ({
  type: ADD_TO_CART,
  payload: dish,
});

export const removeFromCartAction = (dish) => ({
  type: REMOVE_FROM_CART,
  payload: dish,
});

export const updateCartAction = (dish) => ({
  type: UPDATE_CART,
  payload: dish,
});

export const clearCartAction = () => ({
  type: CLEAR_CART,
});

export const setAddressListAction = (list) => ({
  type: SET_ADDRESS_LIST,
  payload: list,
});

export const showOrderConfirmModalAction = ({ orderid }) => ({
  type: SHOW_ORDER_CONFIRM_MODAL,
  payload: { orderid },
});

export const hideOrderConfirmModalAction = () => ({
  type: HIDE_ORDER_CONFIRM_MODAL,
});

export const showOrderDetailsModalAction = ({ order }) => ({
  type: SHOW_ORDER_DETAILS_MODAL,
  payload: { ...order },
});

export const hideOrderDetailsModalAction = () => ({
  type: HIDE_ORDER_DETAILS_MODAL,
});

export const setFavoritesListAction = (favoritesList) => ({
  type: SET_FAVORITES_LIST,
  payload: favoritesList,
});

export const addFavoritesAction = (restaurantid) => ({
  type: ADD_FAVORITE,
  payload: restaurantid,
});

export const removeFavoriteAction = (restaurantid) => ({
  type: HIDE_ORDER_DETAILS_MODAL,
  payload: restaurantid,
});

export const setFiltersAction = (filters) => ({
  type: SET_FILTERS,
  payload: filters,
});

export const addFiltersAction = (filters) => ({
  type: ADD_FILTERS,
  payload: filters,
});

export const removeFiltersAction = () => ({
  type: REMOVE_FILTERS,
});

export const clearFiltersAction = () => ({
  type: CLEAR_FILTERS,
});

export const showAddDishModalAction = () => ({
  type: SHOW_ADD_DISH_MODAL,
});

export const hideAddDishModalAction = () => ({
  type: HIDE_ADD_DISH_MODAL,
});

export const updateDishDataInModalAction = (data) => ({
  type: UPDATE_DISH_DATA_IN_MODAL,
  payload: data,
});
