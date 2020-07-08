import React, { createContext, useState } from 'react';

export const PurchaseContext = createContext();

export default ({ children }) => {
    const [purchased, setPurchased] = useState([]);
    const [value, setValue] = useState(0);

    const addPurchase = (purchase) => {
        setPurchased([...purchased, purchase]);
        setValue(value + purchase.price);
    };

    return (
        <PurchaseContext.Provider value={{ purchased, value, addPurchase }}>
            { children }
        </PurchaseContext.Provider>
    );
}