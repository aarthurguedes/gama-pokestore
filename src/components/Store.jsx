import React, { useState, useEffect, useContext } from 'react';

import './Store.css';
import { getPokemons } from '../services/api';
import { PurchaseContext } from '../contexts/PurchaseContext';
import { toMoney } from '../util/util';

export default () => {
    const [pokemons, setPokemons] = useState({
        next: '',
        results: []
    });
    const { addPurchase } = useContext(PurchaseContext);

    useEffect(() => {
        const updatePokemons = async () => {
            if (!pokemons.results.length) {
                const newPokemons = await getPokemons(0) || pokemons;

                setPokemons({
                    next: newPokemons.next,
                    results: pokemons.results.concat(newPokemons.results)
                });
            }
        };

        updatePokemons();
    }, [pokemons]);

    const addPokemonCard = () => {
        return pokemons.results.map(result => {
            return (
                <div className="pokemon-card" key={result.name}>
                    <span>{result.name}</span>
                    <img src={result.imgURL} alt={result.name}/>
                    <span>{toMoney(result.price)}</span>
                    <button onClick={() => addPurchase({ name: result.name,  price: result.price })}>Comprar</button>
                </div>
            );
        });
    }

    const loadMore = async () => {
        const regex = /offset=([^&]*)/;
        const offset = pokemons.next ? pokemons.next.match(regex)[1] : '';
        const newPokemons = await getPokemons(offset) || { ...pokemons, results: [] };

        setPokemons({
            next: newPokemons.next,
            results: pokemons.results.concat(newPokemons.results)
        });
    }

    return (
        <main className="main">
            <div className="cards">
                {addPokemonCard()}
            </div>
            <div className="buttons__container">
                <button onClick={loadMore}>
                    Carregar mais
                </button>
            </div>
        </main>
    );
}
