import { View, Text, StyleSheet, Image, Button } from 'react-native'
import React, {useEffect, useState} from 'react'
import { getPokemonDetailsByUrlApi, getPokemonsApi } from '../api/pokemon';
import Pokedex from '../components/Pokedex';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PokedexScreen() {

  const [pokemons, setPokemons] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);

  /* console.log('pokemons=> ', pokemons); */

  useEffect(() => {
      (async ()=> {
          await loadPokemons();
      })()
      console.log('Hola Mundo');
  }, []);

  const loadPokemons = async () => {
      try {
          //para cargar los pokemones
          const response = await getPokemonsApi(nextUrl);
          setNextUrl(response.next);
          const pokemonsArray = [];
          for await (const pokemon of response.results) {
              const pokemonDetails = await getPokemonDetailsByUrlApi(pokemon.url);
              pokemonsArray.push({
                  id: pokemonDetails.id,
                  name: pokemonDetails.name,
                  type: pokemonDetails.types[0].type.name,
                  order: pokemonDetails.order,
                  image: pokemonDetails.sprites.other['official-artwork'].front_default,
                }
              );
          }
          setPokemons([...pokemons, ...pokemonsArray]);
          /* console.log(response); */
      } catch (error) {
          console.error(error);
      }
  }

  /* const detailsPokemon = async (pokemonDetails) => {
      try {
          //para cargar los detalles de un pokemon
          const response = await getPokemonDetailsByUrlApi(pokemonDetails);
          console.log('detalles=>', response);
      } catch (error) {
          console.error(error);
      }
  } */

  return(
    <SafeAreaView style={{paddingTop: -20}}>
      <Pokedex isNext={nextUrl} pokemons={pokemons} loadPokemons={loadPokemons} />
    </SafeAreaView>
  )
}
