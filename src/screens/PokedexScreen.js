import React, { useEffect, useState } from "react";
import { getPokemonDetailsByUrlApi, getPokemonsApi } from "../api/pokemon";
import Pokedex from "../components/Pokedex";
import { SafeAreaView } from "react-native-safe-area-context";

export default function PokedexScreen() {
  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /* console.log('pokemons=> ', pokemons); */
  useEffect(() => {
    (async () => {
      await loadPokemons();
    })();
    console.log("Hola Mundo");
  }, []);

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
      setPokemons([...pokemons, ...pokemonsArray]);
      /* console.log(response); */
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
