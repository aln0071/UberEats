/* eslint no-case-declarations: 0, no-param-reassign: 0, max-len: 0 */
import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_FROM_CART,
  UPDATE_CART,
} from '../actions/types';

// const initialState = {
//   items: {},
//   restaurantid: undefined,
// };

const initialState = {
  restaurantid: '6181b74e687cb72cd0696b81',
  items: {
    '6182d4935c350804bd9da2b8': {
      _id: '6182d4935c350804bd9da2b8',
      restaurantid: '6181b74e687cb72cd0696b81',
      dishname: 'Rice',
      description: 'Good rice',
      category: 1,
      price: 1.7,
      pictures: [],
      __v: 0,
      dishid: '6182d4935c350804bd9da2b8',
      count: 1,
    },
  },
};

// const initialState = {
//   restaurantid: 17,
//   items: {
//     22: {
//       dishid: 22,
//       restaurantid: 17,
//       dishname: 'Hello World',
//       description: '',
//       category: 1,
//       price: 1,
//       pictures: '[]',
//       count: 1,
//     },
//     23: {
//       dishid: 23,
//       restaurantid: 17,
//       dishname: 'test',
//       description: '',
//       category: 1,
//       price: 1,
//       pictures: '[]',
//       count: 3,
//     },
//     25: {
//       dishid: 25,
//       restaurantid: 17,
//       dishname: 'New world',
//       description: 'Very good',
//       category: 1,
//       price: 1,
//       pictures:
//         '["67e8382bedd39df8b34004a82e0558b6","cb417bf6cf7fba0668c9bb15a74b2932","fd00c08a334ed77c947b07fda280d725","29191f4072a181bd85a18725789d0558"]',
//       count: 3,
//     },
//     26: {
//       dishid: 26,
//       restaurantid: 17,
//       dishname: 'Curry',
//       description: 'Very cool',
//       category: 1,
//       price: 1,
//       pictures:
//         '["89e0872e8984128432e1ecdc4fe5a8ff","7d312d628fb24b15c5a33522fa145d7e","ed8e6f29605dcb232d11a36b52aefe57"]',
//       count: 2,
//     },
//   },
// };

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
