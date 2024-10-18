import React, { useState, useEffect } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from './src/navigation/Navigation';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { FavoritesProvider } from './FavoritesContext';
import Toast from 'react-native-toast-message';
import CustomSplashScreen from './src/screens/CustomSplashScreen';
import UpdateChecker from './src/utils/UpdateChecker';

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
    // Simplemente establecemos isLoading a false después de un breve retraso
    // para simular cualquier inicialización necesaria
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <CustomSplashScreen />;
  }
  
  return (
    <SafeAreaProvider>
      <NavigationContainer theme={darkTheme}>
        <FavoritesProvider>
          <UpdateChecker />
          <Navigation />
          <StatusBar style="light" />
          <Toast />
        </FavoritesProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}