import AsyncStorage from '@react-native-async-storage/async-storage';

const POKEMON_CACHE_KEY = '@PokemonCache';
const CACHE_TIMESTAMP_KEY = '@PokemonCacheTimestamp';
const CACHE_EXPIRY_DAYS = 7; // La cache expira despues de 7 dias
const MAX_CACHED_POKEMON = 250; // Limito a 250 pokemones en cache

export const cacheService = {
  async getCachedPokemons() {
    try {
      const cachedData = await AsyncStorage.getItem(POKEMON_CACHE_KEY);
      const timestamp = await AsyncStorage.getItem(CACHE_TIMESTAMP_KEY);
      
      if (cachedData && timestamp) {
        const now = new Date().getTime();
        const cacheAge = (now - parseInt(timestamp)) / (1000 * 60 * 60 * 24); // Edad en días
        
        if (cacheAge < CACHE_EXPIRY_DAYS) {
          return JSON.parse(cachedData);
        }
      }
      return null;
    } catch (error) {
      console.error('Error getting cached pokemons:', error);
      return null;
    }
  },

  async setCachedPokemons(pokemons) {
    try {
      const pokemonsToCache = pokemons.slice(0, MAX_CACHED_POKEMON);
      await AsyncStorage.setItem(POKEMON_CACHE_KEY, JSON.stringify(pokemonsToCache));
      await AsyncStorage.setItem(CACHE_TIMESTAMP_KEY, new Date().getTime().toString());
    } catch (error) {
      console.error('Error setting cached pokemons:', error);
    }
  },

  async clearCache() {
    try {
      await AsyncStorage.removeItem(POKEMON_CACHE_KEY);
      await AsyncStorage.removeItem(CACHE_TIMESTAMP_KEY);
    } catch (error) {
      console.error('Error clearing pokemon cache:', error);
    }
  }
};