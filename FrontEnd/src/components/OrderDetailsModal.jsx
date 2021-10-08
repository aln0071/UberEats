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
// import { KIND as ButtonKind } from "baseui/button";
import { useDispatch, useSelector } from 'react-redux';
import { hideOrderDetailsModalAction } from '../store/actions';
import styles from '../styles.scss';

export default () => {
  const orderDetailsModal = useSelector((state) => state.orderDetailsModal);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(hideOrderDetailsModalAction());
  };
  let total = 0;
  const taxPercent = 0.15;
  const deliveryFeePercent = 0.2;
  return (
    <Modal
      onClose={() => closeModal()}
      closeable
      isOpen={orderDetailsModal.show}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Order Details</ModalHeader>
      <ModalBody>
        {Object.values(orderDetailsModal.orderDetails).map((item) => {
          total += item.quantity * item.price;
          return (
            <div>
              <div className={styles.placeOrderBodyLeftItemHeader}>
                {item.dishname}
              </div>
              <div className={styles.placeOrderBodyLeftItemFooter}>
                <span>
                  Quantity:&nbsp;
                  {item.quantity}
                </span>
                <span>
                  $
                  {item.quantity * item.price}
                </span>
              </div>
              <hr />
            </div>
          );
        })}

        <div className={styles.placeOrderBodyLeftItemFooter}>
          <span>Taxes:</span>
          <span>
            $
            {(total * taxPercent).toFixed(2)}
          </span>
        </div>

        <div className={styles.placeOrderBodyLeftItemFooter}>
          <span>Delivery Fee:</span>
          <span>
            $
            {(total * deliveryFeePercent).toFixed(2)}
          </span>
        </div>

        <div className={styles.placeOrderBodyLeftItemFooter}>
          <span>Subtotal:</span>
          <span>
            $
            {orderDetailsModal.price}
          </span>
        </div>
        <hr />
        {orderDetailsModal.deliverymode === 1 && (
          <div>
            Address:
            <div>
              {orderDetailsModal.location}
              <br />
              {orderDetailsModal.zip}
            </div>
          </div>
        )}
      </ModalBody>
      <ModalFooter>
        <ModalButton>Okay</ModalButton>
      </ModalFooter>
    </Modal>
  );
};
