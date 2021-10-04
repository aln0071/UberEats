import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card, StyledBody } from 'baseui/card';
import { baseUrl, dishCategories, urls } from '../utils/constants';
import { BlackFormControl, BlackTextField } from '../utils';
import { updateDishAction } from '../store/actions';
import PlaceOrderModal from './PlaceOrderModal';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     margin: theme.spacing(1),
//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//     '& .MuiFormControl-root': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//     '& .MuiButtonBase-root': {
//       margin: theme.spacing(1),
//     },
//   },
// }));

export default function Dish({ dish, index }) {
  // const classes = useStyles();

  const renderCategories = () => dishCategories.map((cat) => (
    <MenuItem key={`${cat.id}${cat.label}`} value={cat.id}>
      {cat.label}
    </MenuItem>
  ));

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { id } = e.target;
    const { value } = e.target;
    dispatch(updateDishAction(index, { ...dish, [id]: value }));
  };

  const user = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);

  const isCustomer = user.type === 'c';

  return (
    <div>
      <Card
        key={dish.dishid}
        overrides={{ Root: { style: { width: '328px', cursor: 'pointer' } } }}
        headerImage={`${baseUrl}${urls.uploadsFolder}/${
          JSON.parse(dish.pictures)[0] || '/no-image'
        }`}
        title={dish.dishname}
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {!isCustomer && (
          <StyledBody>
            <BlackTextField
              required
              id="dishname"
              label="Name"
              value={dish.dishname}
              onChange={handleChange}
              type="text"
            />
            <BlackTextField
              id="description"
              label="Description"
              value={dish.description}
              onChange={handleChange}
              type="text"
            />
            <BlackFormControl>
              <InputLabel required>Category</InputLabel>
              <Select
                onChange={(e) => {
                  handleChange({
                    target: {
                      id: 'category',
                      value: e.target.value,
                    },
                  });
                }}
                value={dish.category}
              >
                {renderCategories()}
              </Select>
            </BlackFormControl>
            <BlackTextField
              id="price"
              label="Price"
              value={dish.price}
              onChange={handleChange}
              type="number"
            />
            <IconButton aria-label="delete">
              <DeleteIcon />
            </IconButton>
          </StyledBody>
        )}
        <StyledBody>
          <div>{dish.description}</div>
          <div>
            Price: $
            {dish.price}
          </div>
        </StyledBody>
      </Card>
      <PlaceOrderModal dish={dish} isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

Dish.defaultProps = {
  dish: {},
  index: 0,
};

Dish.propTypes = {
  dish: PropTypes.shape({
    dishid: PropTypes.number,
    dishname: PropTypes.string,
    description: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
    pictures: PropTypes.string,
  }),
  index: PropTypes.number,
};
