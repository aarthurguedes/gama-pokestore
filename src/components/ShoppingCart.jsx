import React, { useContext } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

import './ShoppingCart.css';
import { PurchaseContext } from '../contexts/PurchaseContext';
import { toMoney } from '../util/util';

export default () =>  {
    const { purchased, value } = useContext(PurchaseContext);

    const addPurchaseItem = () => {
        return purchased.map((purchase, index) => {
            return (
                <li key={index}>{`${purchase.name} - ${toMoney(purchase.price)}`}</li>
            );
        })
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
                {addPurchaseItem()}
            </ol>
            <p>
                <span>Total:</span> {toMoney(value)}
            </p>
            {addPurchaseButton()}
        </aside>
    );
}
