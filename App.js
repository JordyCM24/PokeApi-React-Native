import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from "react-native-safe-area-context";
import Navigation from './src/navigation/Navigation';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { FavoritesProvider } from './FavoritesContext';

const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#000',
  },
};

export default function App() {
  return (
    <FavoritesProvider>
      <SafeAreaProvider>
        <StatusBar style="light" />
        <NavigationContainer theme={darkTheme}>
          <Navigation />
        </NavigationContainer>
      </SafeAreaProvider>
    </FavoritesProvider>
  );
}