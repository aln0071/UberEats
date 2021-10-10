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
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const NewRestaurantConfirmationModal = ({ isOpen, setIsOpen, onConfirm }) => {
  const newRestaurantName = useSelector(
    (state) => state.currentRestaurant.name,
  );
  const restaurants = useSelector((state) => state.restaurants);
  const oldRestaurantId = useSelector((state) => state.cart.restaurantid);
  let oldRestaurantName = '';
  if (oldRestaurantId !== undefined) {
    oldRestaurantName = restaurants.find(
      (restaurant) => restaurant.restaurantid === oldRestaurantId,
    ).name;
  }
  return (
    <Modal
      onClose={() => setIsOpen(false)}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>Create new order?</ModalHeader>
      <ModalBody>
        Your order contains items from
        {' '}
        {oldRestaurantName}
        . Create a new order
        to add items from
        {' '}
        {newRestaurantName}
        .
      </ModalBody>
      <ModalFooter>
        <ModalButton onClick={() => onConfirm()}>New Order</ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default NewRestaurantConfirmationModal;

NewRestaurantConfirmationModal.defaultProps = {
  isOpen: false,
  setIsOpen: () => {},
  onConfirm: () => {},
};

NewRestaurantConfirmationModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
  onConfirm: PropTypes.func,
};
