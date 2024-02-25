import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, TouchableOpacity } from 'react-native'
import React, {useEffect, useState, createContext, useContext } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import getColorByPokemonType from '../utils/getColorByPokemonType';
import { capitalize } from 'lodash';
import { FavoritesContext } from '../../FavoritesContext';


export default function PokemonCard(props) {

  const { pokemon } = props;
    
  const pokemonColor = getColorByPokemonType(pokemon.type);
  const container = {backgroundColor: pokemonColor, ...styles.container};

  /* const typesColor = { backgroundColor: typesColor, styles: styles.types}; */
  /* console.log('pokemonColor=>', pokemonColor); */

  const [isFavorite, setIsFavorite ] = useState(true);
  const [isPoke, setIsPoke] = useState([]);
  const { favorites, setFavorites } = useContext(FavoritesContext);

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    setFavorites((prevFavorites) => {
      // Update favorites list based on isFavorite
      return prevFavorites.some(fav => fav.name === pokemon.name)
        ? prevFavorites.filter((fav) => fav.name !== pokemon.name)
        : [...prevFavorites, pokemon];
    });
  };
  
  const goToPokemon = () => {
    console.log(`Vamos al pokemon: ${pokemon.name}`);
    console.log(pokemon);
  }
   return (
    <TouchableWithoutFeedback onPress={goToPokemon}>
      <View style={container}>
        <View style={styles.containerImg}>
          <Image style={styles.img} source={{uri: pokemon.image}}/>
        </View>
        <View style={styles.containerName}>
          <Text style={styles.tittle} >{capitalize(pokemon.name)}</Text>
          <Text style={styles.number} >#{`${pokemon.order}`.padStart(3, 0)}</Text> 
        </View>
        <View style={styles.containerTypes}>
          <View style={styles.containerIcons}>
            <Icon name='eye'  size={20 } color={'black'} />
            <TouchableOpacity onPress={() => handleFavoriteToggle(pokemon)}>
              <Icon name="heart" size={20} color={isFavorite ? 'black' : 'red'} />
            </TouchableOpacity>
          </View>
          <View style={styles.containerTypeItems}>
            <Text style={styles.types }>{pokemon.type}</Text> 
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
      
  )
}

const styles = StyleSheet.create({
container: {
  flexDirection: 'row', // Alinea los hijos horizontalmente
  padding: 10,
  borderRadius: 10,
  marginHorizontal:5,
  marginVertical: 10,
  height: 100,
},
bgStyles: {
  backgroundColor: 'green',
},
containerImg: {
  flex: 1, // Toma 1/3 del espacio disponible
  alignItems: 'center',
  justifyContent: 'center',
},
img: {
  width: 100,
  height: 100,
},
containerName:{
  flex: 1, // Toma 2/3 del espacio disponible
  alignItems: 'left',
  justifyContent: 'center',
},
tittle: {
  fontSize: 18,
  fontWeight: 'bold',
  color: '#fff',
},
number: {
  fontSize: 16,
  color: '#E3E1D9',
},
containerTypes: {
  flex: 1, // Toma 3/3 del espacio disponible
  flexDirection: 'column', // Alinea los hijos verticalmente
  justifyContent: 'center',
  alignItems: 'flex-end',
},
types: {
  textAlign: 'center',
  color: '#fff',
  backgroundColor: '#8E7AB5',
  padding: 5,
  borderRadius: 5,
  minWidth: 60,
  maxWidth: 'auto'
},
containerIcons: {
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-end',
  paddingHorizontal: 5,
  paddingBottom: 10,
  gap: 12,
},
containerTypeItems: {
  display: 'flex',
  gap: 5,
},

});
  
  