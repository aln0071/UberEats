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
  instructions,
}) => async (dispatch, getState) => {
  const { userid } = getState().user;
  const { restaurantid, items } = getState().cart;
  try {
    const response = await placeOrder({
      locationid,
      zip,
      location,
      citycode,
      city,
      userid,
      price,
      deliverymode,
      tax,
      deliveryfee,
      name,
      instructions,
      restaurantid,
      items: Object.values(items).map((dish) => ({
        dishname: dish.dishname,
        price: dish.price,
        quantity: dish.count,
      })),
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
