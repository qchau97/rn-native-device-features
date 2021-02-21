import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import React from 'react';
import { PlacesNavigator } from './navigation/PlacesNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <PlacesNavigator />
    </NavigationContainer>
  );
};

export default App;
