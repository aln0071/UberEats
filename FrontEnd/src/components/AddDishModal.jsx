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
import { KIND as ButtonKind } from 'baseui/button';
import { Input } from 'baseui/input';
import { FormControl } from 'baseui/form-control';
import { Select } from 'baseui/select';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { addDish } from '../utils/endpoints';
import { createToastBody, toastOptions } from '../utils';
import { isValid, validations } from '../utils/validations';

export default function AddDishModal({ isOpen, setIsOpen }) {
  const [values, setValues] = React.useState({
    dishname: '',
    description: '',
    category: [{ id: 1, label: 'Veg' }],
    price: 1,
  });
  const handleChange = (e) => {
    setValues({
      ...values,
      [e.target.id]: e.target.value,
    });
  };

  const validateDishes = (val) => {
    const dishesProfile = validations.dishes;
    const errors = {};
    Object.keys(dishesProfile).forEach((key) => {
      if (!isValid(dishesProfile[key].regex, val[key])) {
        errors[key] = dishesProfile[key].message;
      }
    });
    return errors;
  };

  const user = useSelector((state) => state.user);

  const handleSubmit = async () => {
    const newValues = {
      ...values,
      category: values.category[0].id,
      restaurantid: user.userid,
    };

    const errors = validateDishes(newValues);
    if (JSON.stringify(errors) !== '{}') {
      toast.error('Error: Please correct errors', toastOptions);
      return;
    }

    try {
      const response = await addDish(newValues);
      toast.success(`Success: ${response.message}`, toastOptions);
      setIsOpen(false);
    } catch (error) {
      toast.error(createToastBody(error), toastOptions);
    }
  };

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
      <ModalHeader>Add Dish</ModalHeader>
      <ModalBody>
        <FormControl label="Name">
          <Input
            id="dishname"
            value={values.dishname}
            onChange={handleChange}
            placeholder="Name"
            clearOnEscape
          />
        </FormControl>
        <FormControl label="Description">
          <Input
            id="description"
            value={values.description}
            onChange={handleChange}
            placeholder="Description"
            clearOnEscape
          />
        </FormControl>
        <FormControl label="Category">
          <Select
            id="category"
            onChange={(param) => setValues({ ...values, category: param.value })}
            options={[
              { label: 'Veg', id: 1 },
              { label: 'Non-Veg', id: 2 },
              { label: 'Vegan', id: 3 },
            ]}
            value={values.category}
            deleteRemoves={false}
            escapeClearsValue={false}
            clearable={false}
          />
        </FormControl>
        <FormControl label="Price">
          <Input
            id="price"
            value={values.price}
            onChange={handleChange}
            placeholder="Price"
            clearOnEscape
            type="number"
            min={1}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton
          kind={ButtonKind.tertiary}
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </ModalButton>
        <ModalButton onClick={handleSubmit}>Okay</ModalButton>
      </ModalFooter>
    </Modal>
  );
}

AddDishModal.propTypes = {
  isOpen: PropTypes.bool,
  setIsOpen: PropTypes.func,
};

AddDishModal.defaultProps = {
  isOpen: false,
  setIsOpen: () => {},
};
