import { StyleSheet, FlatList, ActivityIndicator, TextInput, View } from 'react-native'
import React, { useState, useEffect } from 'react';
import PokemonCard from './PokemonCard';
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function Pokedex(props) {
  /* console.log('props=>', props); */

  const {pokemons, loadPokemons, isNext} = props;
  const [search, setSearch] = useState('');

  const loadMore = () => {
    loadPokemons();
  }
  const handleSearch = (term) => {
    setSearch(term.toLowerCase());
  }
  const filteredPokemons = pokemons.filter(pokemon => {
    return pokemon.name.includes(search) || pokemon.order.toString() === search;
  });
  console.log('pokemonFiltrado=>', filteredPokemons);
  
  return(
     <View>
        <View style={styles.inputContainer}>
          <Icon name="search" size={20} color="#ccc" style={styles.icon} />
          <TextInput style={styles.input} placeholder="Buscar.." onChangeText={handleSearch} />
        </View>
        <FlatList
          data={ filteredPokemons }
          showVerticalScrollIndicator = {false}
          keyExtraxtor={(pokemon) => String(pokemon.id)}
          renderItem={({item}) => <PokemonCard pokemon={item}/>}
          contentContainerStyle={styles.flatListContentContainer}
          onEndReached={isNext && loadMore}
          onEndReachedThreshold={0.2}
          ListFooterComponent={
            <ActivityIndicator 
              style={styles.spinner}
              
            />
          }
        />
     </View>
  )
  /* data={pokemons} */
  /* numColumns={2} abajo  de content para que funcione en Android */

}
const styles = StyleSheet.create({
  flatListContentContainer:{
    paddingHorizontal: 5,
  },
  spinner: {
    marginTop: 20,
    marginBottom: 50,
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10, // Agrega el padding deseado aquí
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    margin: 12,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
})

/* numColumns={2} */