import { CLEAR_USER_DETAILS, SET_USER_DETAILS } from './types';

export const loginAction = (userDetails) => ({
  type: SET_USER_DETAILS,
  payload: userDetails,
});

export const updateUserDetails = (userDetails) => ({
  type: SET_USER_DETAILS,
  payload: userDetails,
});

export const logoutAction = () => ({
  type: CLEAR_USER_DETAILS,
});
