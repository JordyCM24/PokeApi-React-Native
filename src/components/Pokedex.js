import { StyleSheet, FlatList, ActivityIndicator, TextInput, View } from 'react-native'
import React, { useState } from 'react';
import PokemonCard from './PokemonCard';
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function Pokedex(props) {

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
          <TextInput 
            style={styles.input} 
            placeholder="Buscar.." 
            onChangeText={handleSearch}
            placeholderTextColor="#888"
          />
        </View>
        <FlatList
          data={ filteredPokemons }
          showVerticalScrollIndicator = {false}
          keyExtraxtor={(pokemon) => String(pokemon.id)}
          renderItem={({item}) => <PokemonCard pokemon={item}/>}
          contentContainerStyle={styles.flatListContentContainer}
          onEndReached={isNext && loadMore}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            <ActivityIndicator 
              style={styles.spinnerContainer}

            />
          }
        />
     </View>
  )
}
const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  spinnerContainer: {
    paddingVertical: 20,
    borderTopWidth: 1,
    borderColor: '#282828'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: '#333',
    backgroundColor: '#1E1E1E',
    paddingHorizontal: 15,
    marginHorizontal: 10,
    marginBottom: 6,
    marginTop: -20,
    elevation: 2, // Sombra para Android
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    color: '#fff',
    fontSize: 16,
  },
})