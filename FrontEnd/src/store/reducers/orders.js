import { SET_ORDER_LIST } from '../actions/types';

const initialState = [];

const orders = (state = [...initialState], action) => {
  switch (action.type) {
    case SET_ORDER_LIST:
      return [...action.payload];
    default:
      return state;
  }
};

export default orders;
