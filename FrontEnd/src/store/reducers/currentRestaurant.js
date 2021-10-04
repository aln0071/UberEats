import { SET_CURRENT_RESTAURANT } from '../actions/types';

const initialState = {};

const currentRestaurant = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_RESTAURANT:
      return { ...action.payload };
    default:
      return state;
  }
};

export default currentRestaurant;
