import React, { useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity, Modal, ScrollView, Alert  } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function AccountScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);

    // Ajustar la fecha a la zona horaria local
    const localDate = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000);
    
    console.log("Fecha seleccionada (local):", localDate.toISOString().split('T')[0]);
    
    setDate(localDate);
    checkDate(localDate);
  };

  const checkDate = (currentDate) => {
    const correctDate = new Date('2005-10-07T00:00:00.000Z');
    
    const isCorrectDate = 
      currentDate.getFullYear() === correctDate.getUTCFullYear() &&
      currentDate.getMonth() === correctDate.getUTCMonth() &&
      currentDate.getDate() === correctDate.getUTCDate();

    console.log("¿Es la fecha correcta?:", isCorrectDate);
    
    if (isCorrectDate) {
      setModalVisible(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Fecha incorrecta. Snorlax sigue bloqueando el camino. ¡Inténtalo de nuevo!');
      setTimeout(() => setErrorMessage(''), 3000); // El mensaje desaparecerá después de 3 segundos
    }

  };

  return (
    <ImageBackground 
      source={require('../assets/fondoEsnorlax.png')} 
      style={styles.background}
    >
      <View style={styles.container}>
        <Image 
          source={require('../assets/snorlax.webp')}
          style={styles.snorlax}
        />
        <Text style={styles.welcomeText}>¡Snorlax ha bloqueado tu camino!</Text>
        <Text style={styles.messageText}>
          Para desbloquearlo debes ingresar una fecha especial
        </Text>
        
        <TouchableOpacity style={styles.dateButton} onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateButtonText}>
            {date.toLocaleDateString()}
          </Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}

        {errorMessage ? (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        ) : null}

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalView}>
              <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Text style={styles.modalTitle}>¡Feliz Cumpleaños, Solecito!</Text>
                <Text style={styles.modalText}>
                  En este día tan especial, quiero desearte todo lo mejor del mundo. Que tu camino esté lleno de alegría, éxitos y muchas aventuras Pokémon.
                </Text>
                <Text style={styles.modalText}>
                  Espero que te guste esta Pokédex que he creado especialmente para ti. Sé cuánto disfrutas jugando Pokémon, así que pensé que sería genial tener una herramienta para ver tus Pokémon favoritos y sus estadísticas.
                </Text>
                <Text style={styles.modalText}>
                  Que cada día sea una nueva oportunidad para atrapar momentos increíbles, evolucionar como persona y ser la mejor entrenadora que puedas ser, tanto en el juego como en la vida.
                </Text>
                <Text style={styles.modalText}>
                  ¡Que tengas un día maravilloso lleno de sorpresas!
                </Text>
                <View style={styles.contIcon}>
                  <Text style={styles.contIconText} >
                    Tqm mucho mucho
                  </Text>
                  <Icon name="heart" size={30} color="#FF69B4"  />
                </View>
              </ScrollView>
              <TouchableOpacity style={styles.helloButton} onPress={() => setModalVisible(false)}>
                  <Text style={styles.helloButtonText}>¡A la aventura!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 20,
  },
  snorlax: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    marginBottom: 20,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  dateButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  dateButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '65%',
  },
  scrollViewContent: {
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FF4500',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
  helloButton: {
    backgroundColor: '#4CAF50',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },
  helloButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contIcon:{
    flexDirection: "row", // Alinea los hijos horizontalmente
    alignItems: 'center',
    gap: 10,
  },
  contIconText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  errorMessage: {
    color: '#FF0000',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
  },
});