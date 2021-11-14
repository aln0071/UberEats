import { SET_CITIES, SET_COUNTRIES, SET_STATES } from '../actions/types';

const initialState = {
  countries: [],
  states: [],
  cities: [],
};

export default function location(state = initialState, action) {
  switch (action.type) {
    case SET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case SET_CITIES:
      return {
        ...state,
        cities: action.payload,
      };
    case SET_STATES:
      return {
        ...state,
        states: action.payload,
      };
    default:
      return state;
  }
}
