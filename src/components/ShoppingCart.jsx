import React, { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

import './ShoppingCart.css';
import { StoreContext } from '../contexts/StoreContext';
import { toMoney } from '../util/util';

export default () =>  {
    const { purchased, purchasePrice } = useContext(StoreContext);

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
        if (purchasePrice !== 0) {
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
                <span>Total:</span> {toMoney(purchasePrice)}
            </p>
            {addPurchaseButton()}
        </aside>
    );
}
