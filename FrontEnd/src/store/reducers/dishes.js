import { ADD_DISH, SET_DISHES } from '../actions/types';

const initialState = [];

const dishes = (state = [...initialState], action) => {
  switch (action.type) {
    case ADD_DISH:
      return [...state, action.payload];
    case SET_DISHES:
      return [...action.payload];
    default:
      return state;
  }
};

export default dishes;
