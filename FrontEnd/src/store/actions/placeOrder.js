import { toast } from 'react-toastify';
// import { setRestaurantsAction } from '.';
import { createToastBody, toastOptions } from '../../utils';
import { placeOrder } from '../../utils/endpoints';

export const placeOrderAction = ({
  locationid, zip, location, citycode, price,
}) => async (dispatch, getState) => {
  const { userid } = getState().user;
  const { cart } = getState();
  try {
    const response = await placeOrder({
      locationid,
      zip,
      location,
      citycode,
      userid,
      ...cart,
      price,
    });
    console.log(response);
    toast.success('Success: order placed', toastOptions);
    // dispatch(setRestaurantsAction(response));
  } catch (error) {
    console.log(error);
    toast.error(createToastBody(error), toastOptions);
  }
};

export const test = () => {};
