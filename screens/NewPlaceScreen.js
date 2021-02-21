import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const NewPlaceScreen = () => {
  return (
    <View>
      <Text>NewPlaceScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export const screenOptions = navigationData => {
  return {
    headerTitle: 'Add Place',
  }
};

export default NewPlaceScreen;

