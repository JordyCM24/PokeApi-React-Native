import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from './src/navigation/Navigation';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { FavoritesProvider } from './FavoritesContext';
import Toast from 'react-native-toast-message';
import CustomSplashScreen from './src/screens/CustomSplashScreen';

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000',
  },
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simula un tiempo de carga
    setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Ajusta este tiempo según tus necesidades
  }, []);

  if (isLoading) {
    return <CustomSplashScreen />;
  }
  
  return (
    <FavoritesProvider>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <NavigationContainer theme={darkTheme}>
          <Navigation />
        </NavigationContainer>
        <Toast />
      </SafeAreaProvider>
    </FavoritesProvider>
  );
}