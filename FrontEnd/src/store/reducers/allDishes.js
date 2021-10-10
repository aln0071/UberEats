import { SET_ALL_DISHES } from '../actions/types';

const initialState = [];

const allDishes = (state = [...initialState], action) => {
  switch (action.type) {
    case SET_ALL_DISHES:
      return [...action.payload];
    default:
      return state;
  }
};

export default allDishes;
