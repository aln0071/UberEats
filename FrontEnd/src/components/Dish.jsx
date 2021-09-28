import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Select, MenuItem, InputLabel } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import { dishCategories } from '../utils/constants';
import { BlackFormControl, BlackTextField } from '../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& .MuiFormControl-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
    '& .MuiButtonBase-root': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Dish({ dish }) {
  const classes = useStyles();

  const handleChange = () => {};

  const renderCategories = () => dishCategories.map((cat) => (
    <MenuItem key={`${cat.id}${cat.label}`} value={cat.id}>
      {cat.label}
    </MenuItem>
  ));

  return (
    <fieldset className={classes.root} noValidate autoComplete="off">
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
        <Select onChange={handleChange} value={dish.category}>
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
    </fieldset>
  );
}

Dish.defaultProps = {
  dish: {},
};

Dish.propTypes = {
  dish: PropTypes.oneOf([PropTypes.object]),
};
