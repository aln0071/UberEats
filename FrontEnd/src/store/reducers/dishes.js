/* eslint no-case-declarations: 0 */
import { ADD_DISH, SET_DISHES, UPDATE_DISH } from '../actions/types';

const initialState = [];

const dishes = (state = [...initialState], action) => {
  switch (action.type) {
    case ADD_DISH:
      return [...state, action.payload];
    case SET_DISHES:
      return [...action.payload];
    case UPDATE_DISH:
      const index = state.findIndex(
        (dish) => dish.dishid === action.payload.dishid,
      );
      const newState = Array.from(state);
      newState.splice(index, 1, action.payload);
      return [...newState];
    default:
      return state;
  }
};

export const updatedDishes = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_DISH:
      return {
        ...state,
        [action.payload.dishid]: action.payload,
      };
    default:
      return state;
  }
};

export default dishes;
