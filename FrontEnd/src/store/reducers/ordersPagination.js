import {
  SET_ORDERS_INDEX,
  SET_ORDERS_PER_PAGE,
  SET_ORDERS_TOTAL_COUNT,
} from '../actions/types';

const initialState = {
  ordersPerPage: 5,
  startingIndex: 0,
  totalCount: 0,
};

export default function ordersPagination(state = initialState, action) {
  switch (action.type) {
    case SET_ORDERS_PER_PAGE:
      return {
        ...state,
        ordersPerPage: action.payload,
      };
    case SET_ORDERS_INDEX:
      return {
        ...state,
        startingIndex: action.payload,
      };
    case SET_ORDERS_TOTAL_COUNT:
      return {
        ...state,
        totalCount: action.payload,
      };
    default:
      return state;
  }
}
