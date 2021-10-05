/* eslint no-case-declarations: 0, no-param-reassign: 0 */
import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
} from '../actions/types';

const initialState = {
  items: {},
  restaurantid: undefined,
};

export default function cart(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_CART:
      const { restaurantid } = action.payload;
      return {
        restaurantid,
        items: {
          ...state.items,
          [action.payload.dishid]: { ...action.payload },
        },
      };
    case REMOVE_FROM_CART:
      delete state.items[action.payload.dishid];
      return {
        ...state,
      };
    case UPDATE_CART:
      return {
        ...state,
        items: {
          ...state.items,
          [action.payload.dishid]: { ...action.payload },
        },
      };
    case CLEAR_CART:
      return {
        ...initialState,
      };
    default:
      return state;
  }
}
