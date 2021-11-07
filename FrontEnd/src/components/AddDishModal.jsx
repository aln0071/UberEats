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
import { useSelector, useDispatch } from 'react-redux';
import { FileUploader } from 'baseui/file-uploader';
import {
  addDish,
  getAllDishes,
  updateDish,
  deleteDish,
} from '../utils/endpoints';
import { createToastBody, toastOptions } from '../utils';
import { isValid, validations } from '../utils/validations';
import {
  hideAddDishModalAction,
  setDishesAction,
  updateDishDataInModalAction,
} from '../store/actions';

// const initialValues = {
//   dishname: '',
//   description: '',
//   category: [{ id: 1, label: 'Veg' }],
//   price: 1,
// };

export const categories = [
  { label: 'Veg', id: 1 },
  { label: 'Non-Veg', id: 2 },
  { label: 'Vegan', id: 3 },
];

export default function AddDishModal() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state) => state.addDishModal.show);
  const values = useSelector((state) => state.addDishModal.data);
  const user = useSelector((state) => state.user);
  const isUpdate = values.dishid !== '';
  const setValues = (val) => dispatch(updateDishDataInModalAction(val));
  const [pictures, setPictures] = React.useState([]);
  const resetValues = () => {
    setPictures([]);
  };

  const removeDish = async () => {
    try {
      const response = await deleteDish(values.dishid);
      console.log(response);
      toast.success('Success: Dish deleted', toastOptions);
      dispatch(hideAddDishModalAction());
      const newDishesList = await getAllDishes(user);
      dispatch(setDishesAction(newDishesList));
      resetValues();
    } catch (error) {
      console.log(error);
      toast.error(createToastBody(error), toastOptions);
    }
  };

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

    newValues.pictures = pictures;

    try {
      // const uploadDetails = await uploadFilesEndpoint(pictures);
      let response = null;
      if (newValues.dishid === '') {
        response = await addDish(newValues);
      } else {
        response = await updateDish(newValues);
      }
      const newDishesList = await getAllDishes(user);
      dispatch(setDishesAction(newDishesList));
      toast.success(`Success: ${response.message}`, toastOptions);
      dispatch(hideAddDishModalAction());
      resetValues();
    } catch (error) {
      console.log(error);
      toast.error(createToastBody(error), toastOptions);
    }
  };

  return (
    <Modal
      onClose={() => dispatch(hideAddDishModalAction())}
      closeable
      isOpen={isOpen}
      animate
      autoFocus
      size={SIZE.default}
      role={ROLE.dialog}
    >
      <ModalHeader>{isUpdate ? 'Update Dish' : 'Add Dish'}</ModalHeader>
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
            options={categories}
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
        <FormControl label="Pictures">
          <span>
            {pictures.map((pic) => (
              <span style={{ marginRight: '10px' }}>{pic.path}</span>
            ))}
            <FileUploader
              onDrop={(acceptedFiles, rejectedFiles) => {
                console.log(rejectedFiles);
                setPictures(acceptedFiles);
              }}
              accept=".jpg,.png"
            />
          </span>
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <ModalButton
          kind={ButtonKind.tertiary}
          onClick={() => {
            dispatch(hideAddDishModalAction());
            resetValues();
          }}
        >
          Cancel
        </ModalButton>
        {isUpdate && (
          <ModalButton
            onClick={() => {
              removeDish();
            }}
          >
            Delete
          </ModalButton>
        )}
        <ModalButton onClick={handleSubmit}>
          {isUpdate ? 'Update' : 'Okay'}
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
}
