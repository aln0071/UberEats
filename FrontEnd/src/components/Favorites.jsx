import React from 'react';
import Restaurants from './Restaurants';

export default function Favorites() {
  return (
    <div>
      <Restaurants onlyFavorites />
    </div>
  );
}
