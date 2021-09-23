import React from 'react';
import { Tabs, Tab } from '@material-ui/core';

export default function NavTabs() {
  return (
    <Tabs indicatorColor="primary" textColor="primary" centered>
      <Tab style={{ color: 'white' }} label="Restaurants" />
      <Tab style={{ color: 'white' }} label="Favourites" />
      <Tab style={{ color: 'white' }} label="Orders" />
    </Tabs>
  );
}
