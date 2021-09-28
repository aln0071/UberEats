import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addDishAction } from '../store/actions';
import { BlackButton, createToastBody, toastOptions } from '../utils';
import { updateProfile } from '../utils/endpoints';
import { isValid, validations } from '../utils/validations';
import Dish from './Dish';

export default function Dishes() {
  const dishes = useSelector((state) => state.dishes);

  const dispatch = useDispatch();

  const addDish = () => {
    dispatch(addDishAction());
  };

  const validateDishes = () => {
    const errors = [];
    const dishesProfile = validations.dishes;
    dishes.forEach((dish) => {
      const dishErrors = {};
      Object.keys(dishesProfile).forEach((key) => {
        if (!isValid(dishesProfile[key], dish[key])) {
          dishErrors[key] = dishesProfile[key].message;
        }
      });
      if (Object.keys(dishErrors) !== 0) {
        errors.push(dishErrors);
      }
    });
    return errors;
  };

  const updateDatabase = async () => {
    try {
      const errors = validateDishes();
      if (errors.length !== 0) {
        toast.error('Error: Invalid data. Please correct them.', toastOptions);
        return;
      }
      const response = await updateProfile(dishes);
      toast.success(`Success: ${response.message}`, toastOptions);
    } catch (error) {
      toast.error(createToastBody(error), toastOptions);
    }
  };

  const renderDishList = () => dishes.map((dish) => <Dish dish={dish} />);

  useEffect(() => {}, []);

  return (
    <div>
      <div>Dish List</div>
      <div>{renderDishList()}</div>
      <BlackButton
        onClick={() => {
          addDish();
        }}
      >
        Add Dish
      </BlackButton>
      <BlackButton onClick={updateDatabase}>Update Database</BlackButton>
    </div>
  );
}
