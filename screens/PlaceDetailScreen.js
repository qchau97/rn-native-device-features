import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PlaceDetailScreen = () => {
  return (
    <View>
      <Text>PlaceDetailScreen</Text>
    </View>
  );
};

export const screenOptions = navigationData => {
  return {
    headerTitle: navigationData.route.params ? navigationData.route.params.placeTitle : '',
  }
}

export default PlaceDetailScreen;

const styles = StyleSheet.create({});
