import React, { useState } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import { MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Card, StyledBody } from 'baseui/card';
// import { toast } from 'react-toastify';
import { baseUrl, urls } from '../utils/constants';
import {
  showAddDishModalAction,
  updateDishDataInModalAction,
} from '../store/actions';
import PlaceOrderModal from './PlaceOrderModal';
// import { updateDishes } from '../utils/endpoints';

import { categories } from './AddDishModal';
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

export default function Dish({ dish }) {
  // const classes = useStyles();

  // const renderCategories = () => dishCategories.map((cat) => (
  //   <MenuItem key={`${cat.id}${cat.label}`} value={cat.id}>
  //     {cat.label}
  //   </MenuItem>
  // ));

  const dispatch = useDispatch();

  // const handleChange = (e) => {
  //   const { id } = e.target;
  //   const { value } = e.target;
  //   dispatch(updateDishAction({ ...dish, [id]: value }));
  // };

  const user = useSelector((state) => state.user);

  const [isOpen, setIsOpen] = useState(false);

  const isCustomer = user.type === 'c';

  // const updateDatabase = async () => {
  //   console.log(index);
  //   try {
  //     const response = await updateDishes(dish);
  //     console.log(response);
  //     toast.success('Success: Data updated', toastOptions);
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(createToastBody(error), toastOptions);
  //   }
  // };

  return (
    <div>
      <Card
        key={dish.dishid}
        overrides={{
          Root: {
            style: { width: '328px', cursor: 'pointer', height: '390px' },
          },
          HeaderImage: {
            style: {
              display: 'block',
              maxWidth: '100%',
              width: '328px',
              height: '270px',
              objectFit: 'cover',
            },
          },
          Contents: { style: { whiteSpace: 'nowrap', overflow: 'hidden' } },
          Title: {
            style: {
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            },
          },
        }}
        headerImage={`${baseUrl}${
          dish.pictures[0] ? 'images' : urls.uploadsFolder
        }/${dish.pictures[0] || 'no-image'}`}
        title={dish.dishname}
        onClick={() => {
          if (isCustomer) setIsOpen(true);
          else {
            dispatch(showAddDishModalAction());
            dispatch(
              updateDishDataInModalAction({
                ...dish,
                category: [categories.find((cat) => cat.id === dish.category)],
              }),
            );
          }
        }}
        style={{ position: 'relative' }}
      >
        {/* {!isCustomer && (
          <StyledBody>
            <Grid gridMargins={0} gridGaps={[0, 0, 10]}>
              <Cell span={12}>
                <BlackTextField
                  required
                  id="dishname"
                  label="Name"
                  value={dish.dishname}
                  onChange={handleChange}
                  type="text"
                  fullWidth
                />
              </Cell>

              <Cell span={12}>
                <BlackTextField
                  id="description"
                  label="Description"
                  value={dish.description}
                  onChange={handleChange}
                  type="text"
                  fullWidth
                />
              </Cell>

              <Cell span={6}>
                <BlackFormControl fullWidth>
                  <InputLabel required>Category</InputLabel>
                  <Select
                    fullWidth
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
              </Cell>

              <Cell span={6}>
                <BlackTextField
                  id="price"
                  label="Price"
                  value={dish.price}
                  onChange={handleChange}
                  type="number"
                />
              </Cell>

              <Cell span={12}>
                <IconButton aria-label="delete">
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  onClick={() => updateDatabase()}
                >
                  <CloudUploadIcon />
                </IconButton>
              </Cell>
            </Grid>
          </StyledBody>
        )} */}
        <StyledBody>
          <div
            style={{
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
            }}
          >
            {dish.description}
          </div>
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
};
