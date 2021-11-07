import { toast } from 'react-toastify';
import { showOrderConfirmModalAction } from '.';
// import { setRestaurantsAction } from '.';
import { createToastBody, toastOptions } from '../../utils';
import { placeOrder } from '../../utils/endpoints';

export const placeOrderAction = ({
  locationid,
  zip,
  location,
  citycode,
  city,
  price,
  deliverymode,
  tax,
  deliveryfee,
  name,
}) => async (dispatch, getState) => {
  const { userid } = getState().user;
  const { cart } = getState();
  try {
    const response = await placeOrder({
      locationid,
      zip,
      location,
      citycode,
      city,
      userid,
      ...cart,
      price,
      deliverymode,
      tax,
      deliveryfee,
      name,
    });
    console.log(response);
    toast.success('Success: order placed', toastOptions);
    // dispatch(setRestaurantsAction(response));
    dispatch(showOrderConfirmModalAction({ orderid: response.orderid }));
  } catch (error) {
    console.log(error);
    toast.error(createToastBody(error), toastOptions);
  }
};

export const test = () => {};
