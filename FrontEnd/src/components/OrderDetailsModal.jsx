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
        if (orderDetailsModal.deliverymode === 2) {
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
        {orderDetailsModal.items.map((item) => (
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
        ))}

        <div className={styles.placeOrderBodyLeftItemFooter}>
          <span>Taxes:</span>
          <span>
            $
            {orderDetailsModal.tax}
          </span>
        </div>

        {orderDetailsModal.deliverymode === 2 && (
          <div className={styles.placeOrderBodyLeftItemFooter}>
            <span>Delivery Fee:</span>
            <span>
              $
              {orderDetailsModal.deliveryfee}
            </span>
          </div>
        )}

        <div className={styles.placeOrderBodyLeftItemFooter}>
          <span>Subtotal:</span>
          <span>
            $
            {orderDetailsModal.price}
          </span>
        </div>
        <hr />
        <div>
          {user.type === 'r' && (
            <>
              Customer Name:
              {' '}
              {orderDetailsModal.customername}
              <br />
              Customer Email:
              {' '}
              {orderDetailsModal.customeremail}
              <br />
              {orderDetailsModal.customerphone && (
                <>
                  Customer Phone:
                  {orderDetailsModal.customerphone}
                </>
              )}
              <hr />
            </>
          )}
          {orderDetailsModal.deliverymode === 2
            ? 'Delivery Address'
            : 'Pickup Address:'}
          <div>
            {orderDetailsModal.location}
            <br />
            {orderDetailsModal.city}
            ,
            {orderDetailsModal.state}
            <br />
            {orderDetailsModal.country}
            {' '}
            {orderDetailsModal.zip}
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        {((user.type === 'c' && orderDetailsModal.status === 1)
          || (user.type === 'r'
            && ![4, 6, 7].includes(orderDetailsModal.status))) && (
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
