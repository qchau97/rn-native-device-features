import React, { useCallback, useEffect, useState } from 'react';
import { Dimensions, Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { Colors } from '../constants/Colors';

const MapScreen = ({ navigation, route }) => {
  const initialLocation = route.params ? route.params.initialLocation : null;
  const isReadonly = route.params ? route.params.readonly : null;
  const [selectedLocation, setSelectedLocation] = useState(initialLocation);

  const { width, height } = Dimensions.get('window');  
  const ASPECT_RATIO = width / height;
  const LATITUDE = initialLocation ? initialLocation.lat : 37.78825;
  const LONGITUDE = initialLocation ? initialLocation.lng : -122.4324;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  const mapRegion = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  const handleLocationSelect = (e) => {
    if (isReadonly) return;
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
        !isReadonly &&
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
      region={mapRegion}
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
