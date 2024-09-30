import React, { createContext, useState } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (pokemon) => {
    setFavorites(prevFavorites => [...prevFavorites, pokemon]);
  };

  const removeFavorite = (pokemonId) => {
    setFavorites(prevFavorites => prevFavorites.filter(pokemon => pokemon.id !== pokemonId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};