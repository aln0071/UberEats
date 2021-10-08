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

const NewRestaurantConfirmationModal = ({ isOpen, setIsOpen, onConfirm }) => (
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
      Your order contains items from another restaurant. Create a new order?
    </ModalBody>
    <ModalFooter>
      <ModalButton onClick={() => onConfirm()}>New Order</ModalButton>
    </ModalFooter>
  </Modal>
);

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
