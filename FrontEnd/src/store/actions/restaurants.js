import { toast } from 'react-toastify';
import { setRestaurantsAction } from '.';
import { createToastBody, toastOptions } from '../../utils';
import { getAllRestaurants } from '../../utils/endpoints';

export const getAllRestaurantsAction = () => async (dispatch, getState) => {
  const { citycode, statecode, countrycode } = getState().user;
  try {
    const response = await getAllRestaurants({
      citycode,
      statecode,
      countrycode,
    });
    dispatch(setRestaurantsAction(response));
  } catch (error) {
    console.log(error);
    toast.error(createToastBody(error), toastOptions);
  }
};

export const test = () => {};
