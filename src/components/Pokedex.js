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
    return pokemon.name.includes(search) || pokemon.id.toString() === search;
  });

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
            isNext && (
              <ActivityIndicator 
                style={styles.spinnerContainer}
                size="large"
                color="#0000ff"
              />
            )
          }
        />
     </View>
  )
}
const styles = StyleSheet.create({
  flatListContentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 80,
    color: 'fff',
  },
  spinnerContainer: {
    paddingVertical: 20,
    marginBottom: 90, // Ajusta este valor según sea necesario
    borderTopWidth: 1,
    borderColor: '#282828',
    color: 'fff',
    backgroundColor: 'fff',
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
    marginBottom: 10,
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