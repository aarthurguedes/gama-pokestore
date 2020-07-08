const BASE_URL = 'https://pokeapi.co/api/v2/pokemon';

const getPokemon = async (name) => {
    const response = await fetch(`${BASE_URL}/${name}`);
    const data = await response.json();

    return {
        name: name.toUpperCase(),
        imgURL: data.sprites.front_default,
        price: Math.floor(Math.random() * 101)
    };
}

const formatResults = async (results) => {
    const formattedResults = await results.map(async result => {
        const newResult = await getPokemon(result.name);
        return newResult;
    });

    return formattedResults;
}

export const getPokemons = async (offset, limit = 12) =>  {
    if (!offset && offset !== 0) return;

    const response = await fetch(`${BASE_URL}?offset=${offset}&limit=${limit}`);
    const data = await response.json();
    const results = await Promise.all(await formatResults(data.results));

    return {
        next: data.next ? data.next : '',
        results
    };
}
