import React, { useContext } from 'react';
import { FaSearch } from 'react-icons/fa';

import './SearchBar.css';
import { StoreContext } from '../contexts/StoreContext';

export default () => {
    const { inputValue, setInputValue } = useContext(StoreContext);

    return (
        <div className="search-bar">
            <FaSearch size={28} />
            <input type="text" placeholder="pesquisar" value={inputValue}
                onChange={(event) => setInputValue(event.target.value)} />
        </div>
    );
}
