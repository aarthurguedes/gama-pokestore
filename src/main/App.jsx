import React from 'react';

import PurchaseProvider  from '../contexts/PurchaseContext'; 
import SearchBar from '../components/SearchBar';
import Store from '../components/Store';
import ShoppingCart from '../components/ShoppingCart';

export default () => {
  return (
    <PurchaseProvider>
      <SearchBar />
      <Store />
      <ShoppingCart />
    </PurchaseProvider>
  );
}
