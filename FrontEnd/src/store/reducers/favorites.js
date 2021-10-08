/* eslint no-case-declarations: 0 */
import {
  ADD_FAVORITE,
  REMOVE_FAVORITE,
  SET_FAVORITES_LIST,
} from '../actions/types';

const initialState = [];

const favorites = (state = [...initialState], action) => {
  switch (action.type) {
    case SET_FAVORITES_LIST:
      return [...action.payload];
    case ADD_FAVORITE:
      const newState = [...state];
      newState.push(action.payload);
      return newState;
    case REMOVE_FAVORITE:
      return [...state].filter(
        (restaurant) => restaurant.userid !== action.payload,
      );
    default:
      return state;
  }
};

export default favorites;
