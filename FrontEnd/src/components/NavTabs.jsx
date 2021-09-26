/* eslint react/jsx-props-no-spreading: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import StoreIcon from '@material-ui/icons/Store';

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function NavTabs({ setCurrentTab, currentTab }) {
  const classes = useStyles();

  const handleChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ boxShadow: 'none' }}>
        <Tabs
          value={currentTab}
          onChange={handleChange}
          aria-label="scrollable prevent tabs example"
          centered
        >
          <Tab
            label="Restaurants"
            icon={<StoreIcon />}
            aria-label="restaurants"
            {...a11yProps(0)}
          />
          <Tab
            label="Favourites"
            icon={<FavoriteIcon />}
            aria-label="favorite"
            {...a11yProps(1)}
          />
          <Tab
            label="Orders"
            icon={<ShoppingBasket />}
            aria-label="shopping"
            {...a11yProps(4)}
          />
        </Tabs>
      </AppBar>
    </div>
  );
}

NavTabs.defaultProps = {
  currentTab: 0,
  setCurrentTab: () => {},
};

NavTabs.propTypes = {
  currentTab: PropTypes.number,
  setCurrentTab: PropTypes.func,
};
