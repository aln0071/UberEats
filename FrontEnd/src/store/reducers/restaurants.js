import { SET_RESTAURANTS } from '../actions/types';

const initialState = [];

const restaurants = (state = [...initialState], action) => {
  switch (action.type) {
    case SET_RESTAURANTS:
      return [...action.payload];
    default:
      return state;
  }
};

export default restaurants;
