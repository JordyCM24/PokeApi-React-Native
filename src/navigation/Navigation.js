import { Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5'
import AccountScreen from '../screens/AccountScreen';
import FavoriteScreen from '../screens/FavoriteScreen';
import PokedexScreen from '../screens/PokedexScreen';

const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { backgroundColor: '#000' },
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#888',
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#fff',
      }}
    >
      <Tab.Screen name="Favorites" component={FavoriteScreen} 
        options={
          {
            tabBarLabel: 'Favorites',
            tabBarIcon: ({color, size})=> (
              <Icon name='heart' color={color} size={size} />
            ),
          }
        } 
      />
      <Tab.Screen name="Pokédex" component={PokedexScreen} 
        options={
          {
            tabBarLabel:"Pokédex",
            tabBarIcon: ()=> (
              renderPokeball()
            ),
          }
        } 
      />
      <Tab.Screen name="Account" component={AccountScreen} 
        options={
          {
            tabBarLabel:"Account",
            tabBarIcon: ({color, size})=> (
              <Icon name='user' color={color} size={size} />
            ),
          }
        }  
      />
    </Tab.Navigator>
  )
}

function renderPokeball() {
  return (
    <Image 
      source={require('../assets/pokeball.png')} 
      style={{width:60, height:60, top: -18}}
    />
  )
}