import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, Alert } from 'react-native';
import { Colors } from '../constants/Colors';

const LocationSelector = () => {
  const handleGetLocation = () => {

  };

  return (
    <View style={styles.locationSelector}>
      <View style={styles.mapPreview}>
        <Text>No location chosen yet!</Text>
      </View>
      <Button title='Get Your Location' color={Colors.primary} onPress={handleGetLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  locationSelector: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 10,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
  },
});

export default LocationSelector;

