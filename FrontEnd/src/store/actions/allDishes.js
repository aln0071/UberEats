import { getAllDishes } from '../../utils/endpoints';
import { SET_ALL_DISHES } from './types';

export const setAllDishesAction = (dishlist) => ({
  type: SET_ALL_DISHES,
  payload: dishlist,
});

export const getAllDishesAction = () => async (dispatch) => {
  try {
    const response = await getAllDishes({ userid: '' });
    dispatch(setAllDishesAction(response));
  } catch (error) {
    console.log(error);
  }
};
