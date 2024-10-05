import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const FavoritesContext = createContext();

const FAVORITES_STORAGE_KEY = '@PokemonFavorites';

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  const loadFavorites = async () => {
    try {
      const storedFavorites = await AsyncStorage.getItem(FAVORITES_STORAGE_KEY);
      if (storedFavorites !== null) {
        const parsedFavorites = JSON.parse(storedFavorites);
        // Verificar y corregir las URLs de las imágenes
        const correctedFavorites = parsedFavorites.map(pokemon => ({
          ...pokemon,
          image: pokemon.image || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
        }));
        setFavorites(correctedFavorites);
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
    }
  };

  const saveFavorites = async (newFavorites) => {
    try {
      await AsyncStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(newFavorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  };

  const addFavorite = (pokemon) => {
    const newFavorites = [...favorites, pokemon];
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  const removeFavorite = (pokemonId) => {
    const newFavorites = favorites.filter(pokemon => pokemon.id !== pokemonId);
    setFavorites(newFavorites);
    saveFavorites(newFavorites);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};