import { Image, Animated, TouchableOpacity, StyleSheet, View } from 'react-native'
import React, { useRef, useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5'
import AccountScreen from '../screens/AccountScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import PokedexScreen from '../screens/PokedexScreen';

const Tab = createBottomTabNavigator();

const TabButton = ({ children, onPress, accessibilityState }) => {
  const focused = accessibilityState.selected;
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (focused) {
      Animated.spring(animatedValue, {
        toValue: 1,
        useNativeDriver: true,
        speed: 12,
        bounciness: 15
      }).start();
    } else {
      Animated.spring(animatedValue, {
        toValue: 0,
        useNativeDriver: true,
        speed: 12,
      }).start();
    }
  }, [focused]);

  const translateY = animatedValue.interpolate({
    inputRange: [0, 2],
    outputRange: [0, -8]
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.tabButton}
    >
      <Animated.View
        style={[
          styles.tabIconContainer,
          { transform: [{ translateY }] }
        ]}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  );
};

export default function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { 
          backgroundColor: '#121212',
          height: 68,
          position: 'absolute',
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
        tabBarButton: (props) => <TabButton {...props} />,
      }}
    >
      <Tab.Screen 
        name="Favorites" 
        component={FavoriteScreen} 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name='heart' color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
        name="Pokédex" 
        component={PokedexScreen} 
        options={{
          tabBarLabel: '',
          tabBarIcon: () => renderPokeball(),
        }}
      />
      <Tab.Screen 
        name="Account" 
        component={AccountScreen} 
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size}) => (
            <Icon name='user' color={color} size={size} />
          ),
        }}  
      />
    </Tab.Navigator>
  );
}

function renderPokeball() {
  return (
    <Image 
      source={require('../assets/pokeball.png')} 
      style={{width: 68, height: 68, top: -20}}
    />
  );
}

const styles = StyleSheet.create({
  tabButton: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabIconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});