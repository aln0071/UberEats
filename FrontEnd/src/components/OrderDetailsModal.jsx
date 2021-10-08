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
import {
  cancelOrderAction,
  changeOrderStatusAction,
} from '../store/actions/orderStates';

export default () => {
  const orderDetailsModal = useSelector((state) => state.orderDetailsModal);
  const dispatch = useDispatch();
  const closeModal = () => {
    dispatch(hideOrderDetailsModalAction());
  };
  const user = useSelector((state) => state.user);
  let total = 0;
  const taxPercent = 0.15;
  const deliveryFeePercent = 0.2;

  const cancelOrder = async () => {
    dispatch(cancelOrderAction());
  };

  const prepareOrder = () => (
    <ModalButton
      onClick={() => {
        dispatch(changeOrderStatusAction('preparing'));
      }}
    >
      Prepare Order
    </ModalButton>
  );

  const onWay = () => (
    <ModalButton
      onClick={() => {
        dispatch(changeOrderStatusAction('onway'));
      }}
    >
      On Way
    </ModalButton>
  );

  const delivered = () => (
    <ModalButton
      onClick={() => {
        dispatch(changeOrderStatusAction('delivered'));
      }}
    >
      Delivered
    </ModalButton>
  );

  const ready = () => (
    <ModalButton
      onClick={() => {
        dispatch(changeOrderStatusAction('ready'));
      }}
    >
      Ready for Pickup
    </ModalButton>
  );

  const picked = () => (
    <ModalButton
      onClick={() => {
        dispatch(changeOrderStatusAction('pickedup'));
      }}
    >
      Picked Up
    </ModalButton>
  );

  const renderRestaurantFooterButtons = () => {
    switch (orderDetailsModal.status) {
      case 1:
        return prepareOrder();
      case 2:
        if (orderDetailsModal.deliverymode === 1) {
          // delivery mode
          return onWay();
        }
        // pickup mode
        return ready();

      case 3:
        return delivered();
      case 5:
        return picked();
      default:
        return null;
    }
  };

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
        <div>
          {orderDetailsModal.deliverymode === 1
            ? 'Delivery Address'
            : 'Pickup Address:'}
          <div>
            {orderDetailsModal.location}
            <br />
            {orderDetailsModal.zip}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        {user.type === 'c' && ![4, 6, 7].includes(orderDetailsModal.status) && (
          <>
            <ModalButton onClick={() => cancelOrder()}>
              Cancel Order
            </ModalButton>
          </>
        )}
        {user.type === 'r' && <>{renderRestaurantFooterButtons()}</>}
        <ModalButton onClick={() => closeModal()}>Close</ModalButton>
      </ModalFooter>
    </Modal>
  );
};
