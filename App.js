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
import * as Updates from 'expo-updates';


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
    async function checkUpdates() {
      try {
        const update = await Updates.checkForUpdateAsync();
        if (update.isAvailable) {
          await Updates.fetchUpdateAsync();
          await Updates.reloadAsync();
        }
      } catch (error) {
        console.error('Error checking for updates:', error);
      } finally {
        setIsLoading(false);
      }
    }

    checkUpdates();
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