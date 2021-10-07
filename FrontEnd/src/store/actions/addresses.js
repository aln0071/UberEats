import { setAddressListAction } from '.';
import { getAllRelatedAddresses } from '../../utils/endpoints';

export const getAddressList = () => async (dispatch, getState) => {
  const { userid } = getState().user;
  try {
    const response = await getAllRelatedAddresses({ userid });
    dispatch(setAddressListAction(response));
  } catch (error) {
    console.log(error);
  }
};

export const test = () => {};
