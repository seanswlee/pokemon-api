import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Pokemon from './Pokemon';

const Pokedex = () => {
  const [pokedexData, setPokedexData] = useState([]);

  const getRandomUrl = () => {
    const regionUrls = {
      0: 'https://pokeapi.co/api/v2/pokemon?limit=151',
      1: 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=151',
      2: 'https://pokeapi.co/api/v2/pokemon?limit=135&offset=251',
    };

    const randomUrl = Math.floor(
      Math.random() * Object.getOwnPropertyNames(regionUrls).length
    );

    return regionUrls[randomUrl];
  };

  // Using Promise.all for all nested fetch calls in global API
  const getPokemonData = async (records) => {
    const allPromises = [];

    records.forEach((entry) => {
      const { url } = entry;
      const promise = new Promise((resolve, _reject) => {
        fetch(url)
          .then((res) => res.json())
          .then((data) => {
            resolve(data);
          })
          .catch((_err) => {
            resolve(null);
          });
      });
      allPromises.push(promise);
    });

    const results = await Promise.all(allPromises);

    // ! Handles Pokemon data that could not be fetched
    // results = results.filter(result => result !== null);

    return results;
  };

  useEffect(() => {
    const getPokedexData = async () => {
      const pokedex = await axios.get(getRandomUrl());
      const records = pokedex.data.results;
      const data = await getPokemonData(records);
      setPokedexData(data);
    };
    getPokedexData();

    // * Anonymous func
    // (async () => {
    //   const url = 'https://pokeapi.co/api/v2/pokemon?limit=100&offset=151';
    //   const pokedex = await axios.get(url);
    //   const records = pokedex.data.results;
    //   const data = await getPokemonData(records);
    //   setPokedexData(data);
    // })();
  }, []);

  const pokemon = pokedexData.map((pokemon) => {
    const { name, sprites } = pokemon;
    return <Pokemon key={name} name={name} sprites={sprites} />;
  });

  return (
    <div id="pokedex-container">
      <h1>Pokedex API</h1>
      {pokemon.length === 0 ? 'Loading...' : pokemon}
    </div>
  );
};

export default Pokedex;
