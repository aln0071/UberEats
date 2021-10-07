import { SET_ADDRESS_LIST } from '../actions/types';

const initialState = [];

const addresses = (state = initialState, action) => {
  switch (action.type) {
    case SET_ADDRESS_LIST:
      return [...action.payload];
    default:
      return state;
  }
};

export default addresses;
