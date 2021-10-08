import * as React from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from 'baseui/modal';
import { useSelector, useDispatch } from 'react-redux';
import {
  clearCartAction,
  hideOrderConfirmModalAction,
  setCurrentTabAction,
} from '../store/actions';

const ConfirmOrderModal = () => {
  const orderConfirmModal = useSelector((state) => state.orderConfirmModal);
  const dispatch = useDispatch();

  const showOrdersPage = () => {
    dispatch(hideOrderConfirmModalAction());
    dispatch(setCurrentTabAction(2));
    dispatch(clearCartAction());
  };

  return (
    <Modal
      onClose={() => {
        showOrdersPage();
      }}
      isOpen={orderConfirmModal.show}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Order Confirmed!</ModalHeader>
      <ModalBody>
        Your order is confirmed with Order ID #
        {orderConfirmModal.orderid}
      </ModalBody>
      <ModalFooter>
        <ModalButton
          onClick={() => {
            showOrdersPage();
          }}
        >
          Okay
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default ConfirmOrderModal;
