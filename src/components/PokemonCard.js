import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Modal,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import getColorByPokemonType from "../utils/getColorByPokemonType";
import { capitalize } from "lodash";
import { FavoritesContext } from "../../FavoritesContext";

export default function PokemonCard(props) {
  //object pokemon
  const { pokemon } = props;

  //Varables de colores segun su tipo
  const pokemonColor = getColorByPokemonType(pokemon.type);
  const container = { backgroundColor: pokemonColor, ...styles.container };

  const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
  const [isFavorite, setIsFavorite] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setIsFavorite(favorites.some(fav => fav.id === pokemon.id));
  }, [favorites, pokemon.id]);

  const handleFavoriteToggle = () => {
    if (isFavorite) {
      removeFavorite(pokemon.id);
    } else {
      addFavorite(pokemon);
    }
  };

  const goToPokemon = () => {
    console.log(`Vamos al pokemon: ${pokemon.name}`);
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
              #{`${pokemon.order}`.padStart(3, 0)}
            </Text>
          </View>
          <View style={styles.containerTypes}>
            <View style={styles.containerIcons}>
              <Icon name="eye" size={20} color={"black"} />
              <TouchableOpacity onPress={() => handleFavoriteToggle(pokemon)}>
                <Icon
                  name="heart"
                  size={20}
                  color={isFavorite ? "red" : "black"}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.containerTypeItems}>
              <Text style={styles.types}>{pokemon.type}</Text>
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
            {/* <Text style={styles.modalText}>ID: {pokemon.id}</Text> */}
            <Text style={styles.modalText}>Número #{pokemon.order}</Text>
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
  containerTypes: {
    flex: 1, // Toma 3/3 del espacio disponible
    flexDirection: "column", // Alinea los hijos verticalmente
    justifyContent: "center",
    alignItems: "flex-end",
  },
  types: {
    textAlign: "center",
    color: "#fff",
    backgroundColor: "#8E7AB5",
    padding: 5,
    borderRadius: 5,
    minWidth: 60,
    maxWidth: "auto",
  },
  containerIcons: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 5,
    paddingBottom: 10,
    gap: 12,
  },
  containerTypeItems: {
    display: "flex",
    gap: 5,
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
