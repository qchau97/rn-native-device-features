import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform } from 'react-native';
import { Colors } from '../constants/Colors';
import MapScreen from '../screens/MapScreen';
import NewPlaceScreen from '../screens/NewPlaceScreen';
import PlaceDetailScreen, { screenOptions as placeDetailScreenOptions } from '../screens/PlaceDetailScreen';
import PlacesListScreen, { screenOptions as placesListScreenOptions } from '../screens/PlacesListScreen';

const defaultNavOptions = {
  headerStyle: {
    backgroundColor: Platform.OS === 'android' ? Colors.primary : '',
  },
  headerTintColor: Platform.OS === 'android' ? '#fff' : Colors.primary,
}
const PlacesStackNavigator = createStackNavigator();

export const PlacesNavigator = () => {
  return (
    <PlacesStackNavigator.Navigator screenOptions={defaultNavOptions}>
      <PlacesStackNavigator.Screen
        name='Places'
        component={PlacesListScreen}
        options={placesListScreenOptions}
      />
      <PlacesStackNavigator.Screen
        name='PlaceDetail'
        component={PlaceDetailScreen}
        options={placeDetailScreenOptions}
      />
      <PlacesStackNavigator.Screen
        name='NewPlace'
        component={NewPlaceScreen}
      />
      <PlacesStackNavigator.Screen
        name='Map'
        component={MapScreen}
      />
    </PlacesStackNavigator.Navigator>
  )
};

