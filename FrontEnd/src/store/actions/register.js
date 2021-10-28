// import { toast } from 'react-toastify';
// import { createToastBody, toastOptions } from '../../utils';
// import { register } from '../../utils/endpoints';
import { CLEAR_REGISTER_ERRORS, SET_REGISTER_ERRORS } from './types';

// const registerAction = (userDetails) => ({
//   type: REGISTER_USER,
//   payload: userDetails,
// });

export const clearRegisterErrorsAction = () => ({
  type: CLEAR_REGISTER_ERRORS,
});

export const setRegisterErrorsAction = (errors) => ({
  type: SET_REGISTER_ERRORS,
  payload: errors,
});

// export const registerUserAction = (userDetails) => async (dispatch, getState) => {
//   const { userid, type } = getState().user;
//   try {
//     const response = await getOrderList(userid, type);
//     dispatch(setOrderListAction(response));
//   } catch (error) {
//     console.log(error);
//     toast.error(createToastBody(error), toastOptions);
//   }
// };
