import React, { useContext } from 'react';
import { FavoritesContext } from '../../FavoritesContext';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import PokemonCard from '../components/PokemonCard';

export default function FavoriteScreen() {
  const context = useContext(FavoritesContext);

  if (!context) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Error: FavoritesContext no disponible</Text>
      </View>
    );
  }

  const { favorites } = context;

  if (favorites.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No tienes Pokémones favoritos aún.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={favorites}
        renderItem={({ item }) => <PokemonCard pokemon={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  listContainer: {
    padding: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    color: '#888',
  },
});