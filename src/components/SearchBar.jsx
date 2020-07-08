import React from 'react';
import { FaSearch } from 'react-icons/fa';

import './SearchBar.css';

export default () => {
    return (
        <div className="search-bar">
            <FaSearch size={28} />
            <input type="text" placeholder="pesquisar" />
        </div>
    );
}
