import { toast } from 'react-toastify';
import { getFavorites, toggleFavorite } from '../../utils/endpoints';
import { createToastBody, toastOptions } from '../../utils';
import { setFavoritesListAction } from '.';

export const getFavoritesListAction = () => async (dispatch, getState) => {
  const { user } = getState();
  try {
    const response = await getFavorites(user.userid);
    dispatch(setFavoritesListAction(response));
  } catch (error) {
    console.log(error);
    toast.error(createToastBody(error), toastOptions);
  }
};

export const toggleFavoriteAction = (restaurantid) => async (dispatch, getState) => {
  const { user } = getState();
  const { favorites } = getState();
  const isFavorite = favorites.findIndex(
    (restaurant) => restaurant.restaurantid === restaurantid,
  ) !== -1;
  try {
    const response = await toggleFavorite({
      userid: user.userid,
      restaurantid,
      isFavorite: !isFavorite,
    });
    if (response.status === true) {
      toast.success('Success: favorites updated', toastOptions);
      // refetch favorites list
      dispatch(getFavoritesListAction());
    } else {
      throw new Error('Failed setting favorite');
    }
  } catch (error) {
    console.log(error);
    toast.error(createToastBody(error), toastOptions);
  }
};
