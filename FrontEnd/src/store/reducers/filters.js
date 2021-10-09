import { ADD_FILTERS, CLEAR_FILTERS, SET_FILTERS } from '../actions/types';

const initialState = {
  deliverymode: 'both',
  country: [],
  state: [],
  city: [],
  name: '',
  mealtype: 'all',
};

const filters = (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_FILTERS:
      return { ...action.payload };
    case CLEAR_FILTERS:
      return { ...initialState };
    case ADD_FILTERS:
      return { ...state, ...action.payload };
    default:
      return state;
  }
};

export default filters;
