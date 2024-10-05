import React, { useEffect, useState } from "react";
import { getPokemonDetailsByUrlApi, getPokemonsApi } from "../api/pokemon";
import Pokedex from "../components/Pokedex";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from '@react-native-async-storage/async-storage';

const POKEMON_CACHE_KEY = '@PokemonCache';
const NEXT_URL_CACHE_KEY = '@NextUrlCache';

export default function PokedexScreen() {

  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /* console.log('pokemons=> ', pokemons); */
  useEffect(() => {
    loadInitialPokemons();
  }, []);

  const loadInitialPokemons = async () => {

    // TODO: para borrar la cache
    //await AsyncStorage.removeItem(POKEMON_CACHE_KEY);
    //await AsyncStorage.removeItem(NEXT_URL_CACHE_KEY);
    
    try {
      const cachedPokemons = await AsyncStorage.getItem(POKEMON_CACHE_KEY);
      const cachedNextUrl = await AsyncStorage.getItem(NEXT_URL_CACHE_KEY);

      if (cachedPokemons && cachedNextUrl) {
        const parsedPokemons = JSON.parse(cachedPokemons);
        const correctedPokemons = parsedPokemons.map(pokemon => ({
          ...pokemon,
          image: pokemon.image || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
        }));
        setPokemons(correctedPokemons);
        setNextUrl(cachedNextUrl);
      } else {
        await loadPokemons();
      }
    } catch (error) {
      console.error("Error loading initial pokemons:", error);
      await loadPokemons();
    }
  };

  const loadPokemons = async () => {
    
    if (isLoading) return; // Evita múltiples cargas simultáneas

    try {
      setIsLoading(true);

      //para cargar los pokemones
      const response = await getPokemonsApi(nextUrl);
      console.log(response);
      setNextUrl(response.next);

      const pokemonsArray = [];
      for await (const pokemon of response.results) {
        const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);
        pokemonsArray.push({
          id: pokemonDetails.id,
          name: pokemonDetails.name,
          types: pokemonDetails.types.map(typeInfo => typeInfo.type.name),
          order: pokemonDetails.order,
          image: pokemonDetails.sprites.other["official-artwork"].front_default,
          abilities: pokemonDetails.abilities.map(abilityInfo => abilityInfo.ability.name),
          height: pokemonDetails.height,
          weight: pokemonDetails.weight,
          //moves: pokemonDetails.moves,
          //mapear al igual que abilities
        });
      }
      const newPokemons = [...pokemons, ...pokemonsArray];
      setPokemons(newPokemons);

      // Guardar en caché
      await AsyncStorage.setItem(POKEMON_CACHE_KEY, JSON.stringify(newPokemons));
      await AsyncStorage.setItem(NEXT_URL_CACHE_KEY, response.next);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // Función para verificar y corregir las URLs de las imágenes
  const verifyAndCorrectImageUrls = (pokemonList) => {
    return pokemonList.map(pokemon => {
      if (!pokemon.image || !pokemon.image.startsWith('http')) {
        // Si la imagen no existe o no es una URL válida, asigna una URL por defecto
        pokemon.image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`;
      }
      return pokemon;
    });
  };

  return (
    <SafeAreaView style={{ paddingTop: -20 }}>
      <Pokedex
        isNext={nextUrl}
        pokemons={pokemons}
        loadPokemons={loadPokemons}
      />
    </SafeAreaView>
  );
}
