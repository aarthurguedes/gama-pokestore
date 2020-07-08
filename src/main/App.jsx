import React from 'react';

import StoreProvider  from '../contexts/StoreContext'; 
import SearchBar from '../components/SearchBar';
import Store from '../components/Store';
import ShoppingCart from '../components/ShoppingCart';

export default () => {
  return (
    <StoreProvider>
      <SearchBar />
      <Store />
      <ShoppingCart />
    </StoreProvider>
  );
}
