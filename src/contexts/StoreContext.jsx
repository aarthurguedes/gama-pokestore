import React, { createContext, useState } from 'react';

export const StoreContext = createContext();

export default ({ children }) => {
    const [inputValue, setInputValue] = useState('');
    const [purchased, setPurchased] = useState({});
    const [purchasePrice, setPurchasePrice] = useState(0);

    const addPurchase = (purchase) => {
        const name = Object.keys(purchase)[0];

        if (purchased[name]) {
            purchased[name] = {
                quantity: purchased[name].quantity + 1,
                price: purchased[name].price + purchase[name].price
            };

            setPurchased({...purchased});
        } else {
            setPurchased({...purchased, ...purchase})
        }

        setPurchasePrice(purchasePrice + purchase[name].price);
    };

    const getFilteredPokemons = (pokemons) =>
        pokemons.filter(pokemon => pokemon.name.toLowerCase().includes(inputValue.toLowerCase()));

    return (
        <StoreContext.Provider value={{ inputValue, setInputValue, getFilteredPokemons,
                                        purchased, purchasePrice, addPurchase }}>
            { children }
        </StoreContext.Provider>
    );
}
