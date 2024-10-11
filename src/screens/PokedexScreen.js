import React, { useEffect, useState } from "react";
import { getPokemonDetailsByUrlApi, getPokemonsApi } from "../api/pokemon";
import Pokedex from "../components/Pokedex";
import { SafeAreaView } from "react-native-safe-area-context";
import { cacheService } from "../utils/cacheService";

export default function PokedexScreen() {

  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadInitialPokemons();
  }, []);

  const loadInitialPokemons = async () => {

    // TODO: para borrar la cache
    //await AsyncStorage.removeItem(POKEMON_CACHE_KEY);
    //await AsyncStorage.removeItem(NEXT_URL_CACHE_KEY);
    
    try {
      const cachedPokemons = await cacheService.getCachedPokemons();

      if (cachedPokemons) {
        setPokemons(cachedPokemons);
        setNextUrl(`https://pokeapi.co/api/v2/pokemon/?offset=${cachedPokemons.length}&limit=30`);
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
      //console.log(response);
      setNextUrl(response.next);

      const newPokemons = await Promise.all(response.results.map(async (pokemon) => {
        const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);
        return {
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
        };
      }));

      const updatedPokemons = [...pokemons, ...newPokemons];
      setPokemons(updatedPokemons);

      // Actualizar la caché
      await cacheService.setCachedPokemons(updatedPokemons);

    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
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
