import React, { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Colors } from '../constants/Colors';

const MapScreen = ({ navigation, route }) => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const initialLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleLocationSelect = (e) => {
    setSelectedLocation({
      lat: e.nativeEvent.coordinate.latitude,
      lng: e.nativeEvent.coordinate.longitude
    })
  };

  const saveSelectedLocation = useCallback(() => {
    if (!selectedLocation) return;
    navigation.navigate('NewPlace', {
      pickedLocation: selectedLocation
    });
  }, [selectedLocation]);

  // With React Navigation 5, we don't use setParams()
  // Instead, we use setOptions() of 'naviagation' props to 'communicate' between navigation and component
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={saveSelectedLocation}>
          <Text style={styles.textButton}>Save</Text>
        </TouchableOpacity>
      ),
    });
  }, [saveSelectedLocation]);

  return (
    <MapView
      style={styles.map}
      region={initialLocation}
      onPress={handleLocationSelect}
    >
      {selectedLocation && <Marker
        coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }}
        title='Picked Location'
      />}
    </MapView>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  buttonContainer: {
    marginHorizontal: 20,
  },
  textButton: {
    textTransform: Platform.OS === 'android' && 'uppercase',
    fontSize: 16,
    color: Platform.OS === 'android' ? '#fff' : Colors.primary,
  },
});
