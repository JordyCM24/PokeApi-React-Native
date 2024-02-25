import React, { useContext } from 'react';
import { FavoritesContext } from '../../FavoritesContext';
import { FlatList, Text, View } from 'react-native';

export default function FavoriteScreen() {
  const { favorites } = useContext(FavoritesContext);
  console.log('favoritos=>', favorites);

  return (
    <View>
      <Text>Favoritos</Text>
      <Text>{favorites.name}</Text>
      {favorites.map((pokemon, index) => (
        <Text key={index}>{pokemon.name}</Text>
      ))}

    </View>
  );
};
