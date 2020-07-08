import React, { useState, useEffect, useContext } from 'react';

import './Store.css';
import { getPokemons } from '../services/api';
import { StoreContext } from '../contexts/StoreContext';
import { toMoney } from '../util/util';

export default () => {
    const [pokemons, setPokemons] = useState({
        next: '',
        results: []
    });

    const { inputValue, getFilteredPokemons, addPurchase } = useContext(StoreContext);

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
        let filteredPokemons = [];

        if (inputValue) filteredPokemons = getFilteredPokemons(pokemons.results);

        const pokemonsItems = inputValue ? filteredPokemons : pokemons.results;

        return pokemonsItems.map(result => {
            return (
                <div className="pokemon-card" key={result.name}>
                    <span>{result.name}</span>
                    <img src={result.imgURL} alt={result.name}/>
                    <span>{toMoney(result.price)}</span>
                    <button onClick={() => addPurchase({ [result.name]: { quantity: 1, price: result.price } })}>Comprar</button>
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
