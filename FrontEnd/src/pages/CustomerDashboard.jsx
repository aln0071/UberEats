import React from 'react';
import PropTypes from 'prop-types';
import Restaurants from '../components/Restaurants';

function TabPanel({ value, index, children }) {
  if (value === index) {
    return <div>{children}</div>;
  }
  return null;
}

TabPanel.defaultProps = {
  value: 0,
  index: 0,
  children: undefined,
};

TabPanel.propTypes = {
  value: PropTypes.number,
  index: PropTypes.number,
  children: PropTypes.node,
};

export default function CustomerDashboard({ currentTab }) {
  return (
    <div>
      <TabPanel value={currentTab} index={0}>
        <Restaurants />
      </TabPanel>
      <TabPanel value={currentTab} index={1}>
        Favourites
      </TabPanel>
      <TabPanel value={currentTab} index={2}>
        Orders
      </TabPanel>
    </div>
  );
}

CustomerDashboard.defaultProps = {
  currentTab: 0,
};

CustomerDashboard.propTypes = {
  currentTab: PropTypes.number,
};
