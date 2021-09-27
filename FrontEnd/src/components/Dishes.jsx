import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addDishAction } from '../store/actions';
import { BlackButton } from '../utils';
import Dish from './Dish';

export default function Dishes() {
  const dishes = useSelector((state) => state.dishes);

  const dispatch = useDispatch();

  const addDish = () => {
    dispatch(addDishAction());
  };

  const updateDatabase = () => {};

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
