import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setDishesAction } from '../store/actions';
// import { addDishAction } from '../store/actions';
import { BlackButton, createToastBody, toastOptions } from '../utils';
import { getAllDishes, updateDishes } from '../utils/endpoints';
import { isValid, validations } from '../utils/validations';
import AddDishModal from './AddDishModal';
import Dish from './Dish';

export default function Dishes() {
  const [isOpen, setIsOpen] = useState(false);

  const dishes = useSelector((state) => state.dishes);

  // const dispatch = useDispatch();

  // const addDish = () => {
  //   dispatch(addDishAction());
  // };

  const validateDishes = () => {
    const errors = [];
    const dishesProfile = validations.dishes;
    dishes.forEach((dish) => {
      const dishErrors = {};
      Object.keys(dishesProfile).forEach((key) => {
        console.log(dishesProfile[key].regex, dish[key]);
        if (!isValid(dishesProfile[key].regex, dish[key])) {
          dishErrors[key] = dishesProfile[key].message;
        }
      });
      if (JSON.stringify(dishErrors) !== '{}') {
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
        console.log(errors);
        return;
      }
      const response = await updateDishes(dishes);
      toast.success(`Success: ${response.message}`, toastOptions);
    } catch (error) {
      toast.error(createToastBody(error), toastOptions);
    }
  };

  const renderDishList = () => dishes.map((dish, index) => (
    <Dish id={dish.dishid} dish={dish} index={index} />
  ));

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(async () => {
    // fetch all dishes
    try {
      const dishList = await getAllDishes(user);
      dispatch(setDishesAction(dishList));
    } catch (error) {
      console.log(error);
      toast.error(createToastBody(error), toastOptions);
    }
  }, []);

  return (
    <div>
      <div>Dish List</div>
      <div>{renderDishList()}</div>
      <AddDishModal isOpen={isOpen} setIsOpen={setIsOpen} />
      <BlackButton
        onClick={() => {
          setIsOpen(true);
        }}
      >
        Add Dish
      </BlackButton>
      <BlackButton onClick={updateDatabase}>Update Database</BlackButton>
    </div>
  );
}
