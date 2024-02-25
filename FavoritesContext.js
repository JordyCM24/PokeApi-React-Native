import React, { createContext, useState, useContext } from 'react';

export const FavoritesContext = createContext({
  favorites: [],
  setFavorites: () => {},
});

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
  
};