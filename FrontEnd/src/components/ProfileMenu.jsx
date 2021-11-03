import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Menu, MenuItem } from '@material-ui/core';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { logoutAction, setCurrentTabAction } from '../store/actions';
import { baseUrl } from '../utils/constants';

export default function ProfileMenu({ setCurrentTab }) {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { pictures } = user;
  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        {pictures.length > 0 ? (
          <Avatar alt={user.name} src={`${baseUrl}images/${pictures[0]}`} />
        ) : (
          <AccountCircle />
        )}
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        style={{ top: 42 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        {user.type === 'c' && (
          <MenuItem
            onClick={() => {
              setCurrentTab(3);
              handleClose();
            }}
          >
            Profile
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(setCurrentTabAction(0));
            dispatch(logoutAction());
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}

ProfileMenu.defaultProps = {
  setCurrentTab: () => {},
};

ProfileMenu.propTypes = {
  setCurrentTab: PropTypes.func,
};
