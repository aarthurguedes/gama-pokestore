import React, { createContext, useState } from 'react';

export const PurchaseContext = createContext();

export default ({ children }) => {
    const [purchased, setPurchased] = useState({});
    const [value, setValue] = useState(0);

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

        setValue(value + purchase[name].price);
    };

    return (
        <PurchaseContext.Provider value={{ purchased, value, addPurchase }}>
            { children }
        </PurchaseContext.Provider>
    );
}
