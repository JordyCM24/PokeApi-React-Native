import React, { useEffect, useRef, useState } from 'react';
import { View, Animated, Easing, StyleSheet } from 'react-native';

const CustomSplashScreen = () => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(0); // Usamos un estado para manejar el progreso

  useEffect(() => {
    // Animación de la imagen
    Animated.loop(
      Animated.timing(translateX, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Simular el progreso de la carga
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 1 ? prev + 0.1 : 1)); // Incrementa el progreso cada 500ms
    }, 250);

    return () => clearInterval(interval); // Limpia el intervalo al desmontar
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/pikachu-running.gif')}
        style={[
          styles.image,
          {
            transform: [
              {
                translateX: translateX.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-100, 50],
                }),
              },
            ],
          },
        ]}
      />
      
      {/* Barra de progreso personalizada */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 140,
  },
  progressBarContainer: {
    width: 250,  // Ancho de la barra de progreso
    height: 20,  // Altura de la barra de progreso
    backgroundColor: '#333',  // Color de fondo de la barra vacía
    borderRadius: 10,
    marginTop: 30,
    overflow: 'hidden',  // Asegura que el progreso no se salga de los bordes
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFD700',  // Color dorado del progreso
    borderRadius: 10,
  },
});

export default CustomSplashScreen;
