import { SET_USER_DETAILS } from './types';

const loginAction = (userDetails) => ({
  type: SET_USER_DETAILS,
  payload: userDetails,
});

export default loginAction;
