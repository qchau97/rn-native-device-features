import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapScreen = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);

  const initialLocation = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const handleLocationSelect = (e) => {
    console.log(e.nativeEvent.coordinate)
    setSelectedLocation({
      lat: e.nativeEvent.coordinate.latitude,
      lng: e.nativeEvent.coordinate.longitude
    })
  };

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
});
