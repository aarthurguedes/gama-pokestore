import React, { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

import './ShoppingCart.css';
import { PurchaseContext } from '../contexts/PurchaseContext';
import { toMoney } from '../util/util';

export default () =>  {
    const { purchased, value } = useContext(PurchaseContext);

    const addPurchaseItems = () => {
        const items = [];

        for (const name in purchased) {
            items.push(
                <li key={name}>{name} ({purchased[name].quantity}) - {toMoney(purchased[name].price)}</li>
            );
        }

        return items.map(item => item);
    }

    const finishPurchase = () => {
        alert('Parabéns! Compra realizada.');
        window.location.reload();
    };

    const addPurchaseButton = () => {
        if (value !== 0) {
            return (
                <button onClick={finishPurchase}>Finalizar Compra</button>
            )
        }
    }

    return (
        <aside className="shopping-cart">
            <div className="shopping-cart--title">
                <FaShoppingCart size={28} />
                <span>Carrinho</span>
            </div>
            <ol>
                {addPurchaseItems()}
            </ol>
            <p>
                <span>Total:</span> {toMoney(value)}
            </p>
            {addPurchaseButton()}
        </aside>
    );
}
