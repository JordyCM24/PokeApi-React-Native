import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'

export default function AccountScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Usuario:</Text>
      <View style={styles.inputContainer}>
        <Icon name="user" size={20} color="#ccc" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Usuario.." />
      </View>
      <Text style={styles.text}>Contraseña:</Text>
      <View style={styles.inputContainer}>
        <Icon name="eye" size={20} color="#ccc" style={styles.icon} />
        <TextInput style={styles.input} placeholder="Contraseña.." secureTextEntry={true} />
      </View>
      <View>
        <Button title="Iniciar sesión" onPress={()=> alert('Inicio de sesión en construcción ⚠')} style={styles.btn} />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  btn: {
    marginTop: 20,
    borderRadius: 10,
    padding: 10,
    backgroundColor: 'red',
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
    width: '65%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
  },
})