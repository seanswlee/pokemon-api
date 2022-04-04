import React from 'react';

const Pokemon = ({ name, sprites }) => {
  const { front_default, front_shiny } = sprites;

  const getRandomSprite = () => {
    const sprites = {
      0: front_default,
      1: front_shiny,
    };

    const randomSprite = Math.floor(
      Math.random() * Object.getOwnPropertyNames(sprites).length
    );

    return sprites[randomSprite];
  };

  const pokemonName = name[0].toUpperCase() + name.substring(1);

  return (
    <figure className="pokemon-container">
      <img src={getRandomSprite()} alt={name} />
      <strong>
        <figcaption>{pokemonName}</figcaption>
      </strong>
    </figure>
  );
};

export default Pokemon;
