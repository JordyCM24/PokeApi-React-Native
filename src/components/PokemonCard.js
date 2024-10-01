import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  ToastAndroid,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import getColorByPokemonType from "../utils/getColorByPokemonType";
import getColorTypePokemon from "../utils/getColorTypePokemon";
import { capitalize } from "lodash";
import { FavoritesContext } from "../../FavoritesContext";
import Toast from 'react-native-toast-message';

export default function PokemonCard(props) {
  //object pokemon
  const { pokemon } = props;

  // Verifica si hay tipos y toma el primero
  const mainType = pokemon.types?.[0] || 'Unknown'; // Usa el primer tipo o 'Unknown' si no hay tipos

  // Variables de colores según su tipo
  const pokemonColor = getColorByPokemonType(mainType);
  const container = { backgroundColor: pokemonColor, ...styles.container };;

  const typePokemonColor = getColorTypePokemon(mainType);
  const typeContent = { backgroundColor: typePokemonColor, ...styles.containerTypeItems };;

  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.some(fav => fav.id === pokemon.id));
  }, [favorites, pokemon.id]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(pokemon.id);
      ToastAndroid.show(`${capitalize(pokemon.name)} ha sido eliminado de tus favoritos`, ToastAndroid.BOTTOM);
    } else {
      addFavorite(pokemon);
      ToastAndroid.show(`${capitalize(pokemon.name)} ha sido añadido a tus favoritos`, ToastAndroid.BOTTOM);
    }
  };

  const goToPokemon = () => {
    console.log(pokemon);
    setModalVisible(true);
  };
  return (
    <>
      <TouchableWithoutFeedback onPress={goToPokemon}>
        <View style={container}>

          <View style={styles.containerImg}>
            <Image style={styles.img} source={{ uri: pokemon.image }} />
          </View>

          <View style={styles.containerName}>
            <Text style={styles.tittle}>{capitalize(pokemon.name)}</Text>
            <Text style={styles.number}>
              #{`${pokemon.id}`.padStart(3, 0)}
            </Text>
          </View>

          <View>
            <View style={styles.containerIcons}>
              <TouchableOpacity onPress={() => handleFavoriteToggle(pokemon)}>
                <Icon
                  name="heart"
                  size={24}
                  color={isFavorite ? "red" : "black"}
                  solid={isFavorite} 
                />
              </TouchableOpacity>
            </View>
            <View style={styles.containerType}>
              {pokemon.types?.map((type, index) => {
                return (
                  <View key={index} style={typeContent}>
                    <Text style={styles.types}>
                      {type}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>
          
        </View>
      </TouchableWithoutFeedback>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Image style={styles.modalImage} source={{ uri: pokemon.image }} />
            <Text style={styles.modalTitle}>{capitalize(pokemon.name)}</Text>
            <Text style={styles.modalText}>Número #{pokemon.order}</Text>
            <Text style={styles.modalText}>Altura: {pokemon.height}</Text>
            <Text style={styles.modalText}>Ancho: {pokemon.weight}</Text>
            <Text style={styles.modalText}>Habilidades: {pokemon.abilities.join(", ")}</Text>
            <Text style={styles.modalText}>Tipo: {pokemon.type}</Text>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Toast />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row", // Alinea los hijos horizontalmente
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 5,
    marginVertical: 10,
    height: 100,
  },
  bgStyles: {
    backgroundColor: "green",
  },
  containerImg: {
    flex: 1, // Toma 1/3 del espacio disponible
    alignItems: "center",
    justifyContent: "center",
  },
  img: {
    width: 100,
    height: 100,
  },
  containerName: {
    flex: 1, // Toma 2/3 del espacio disponible
    alignItems: "left",
    justifyContent: "center",
  },
  tittle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  number: {
    fontSize: 16,
    color: "#E3E1D9",
  },
  containerType: {
    display: 'flex',
    flexDirection: 'row', // Alinear los elementos horizontalmente
    justifyContent: 'flex-end', // Alinear al inicio
    alignItems: 'center', // Alinear verticalmente en el centro
    gap: 1,
    marginTop: 10, 
  },
  containerTypeItems: {
    borderRadius: 6,
    borderColor: '#000',
    borderWidth: 2,
    marginRight: 2, // Simulamos el gap entre elementos
  },
  types: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    padding: 5,
    minWidth: 60,
  },
  containerIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 5,
    paddingBottom: 10,
    gap: 12,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalImage: {
    width: 200,
    height: 200,
    marginBottom: 15,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15,
  },
  modalText: {
    marginBottom: 15,
    fontSize: 16,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "red",
    borderRadius: 20,
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
