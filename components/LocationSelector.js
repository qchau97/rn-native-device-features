import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Button, PermissionsAndroid, Text } from 'react-native';
import { Colors } from '../constants/Colors';
import RNLocation from 'react-native-location';
import RcMapView from './RcMapView';

const LocationSelector = ({ navigation, route, onLocationSelected }) => {
  // React Navigation 5 has no getParam() function
  // Instead, there is another prop beside 'navigation' prop: 'route'
  // 'params' key holds an object with all params received as key-value pairs
  const mapPickedLocation = route.params ? route.params.pickedLocation : null;
  const [isFetching, setIsFetching] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Allow RNNativeFeatures to use your location?",
          message:
            "RNNativeFeatures uses this to provide more relevant and personalized experiences.",
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'Allow'
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the camera");
        return true;
      } else {
        console.log("Camera permission denied");
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const handleGetLocation = async () => {
    setIsFetching(true);
    const hasPermission = await requestLocationPermission();
    if (!hasPermission) return;
    RNLocation.configure({ distanceFilter: 5 });
    const currentLocation = await RNLocation.getLatestLocation({ timeout: 60000 });
    setCurrentLocation({
      lat: currentLocation.latitude,
      lng: currentLocation.longitude,
    });
    onLocationSelected({
      lat: currentLocation.latitude,
      lng: currentLocation.longitude,
    });
    if (currentLocation) setIsFetching(false);
  };

  const handlePickLocation = () => {
    navigation.navigate('Map');
  };

  useEffect(() => {
    handleGetLocation();
  }, []);

  useEffect(() => {
    if (mapPickedLocation) {
      setCurrentLocation(mapPickedLocation);
      onLocationSelected(mapPickedLocation);
    }
  }, [mapPickedLocation, onLocationSelected]);

  return (
    <View style={styles.locationSelector}>
      <View style={styles.mapContainer}>
        {currentLocation !== null && <RcMapView navigation={navigation} location={currentLocation} />}
      </View>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title='Get Current Location' color={Colors.primary} onPress={handleGetLocation} />
        </View>
        <View style={styles.button}>
          <Button title='Pick Location On Map' color={Colors.primary} onPress={handlePickLocation} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  locationSelector: {
    marginBottom: 15,
  },
  mapContainer: {
    marginBottom: 15,
    width: '100%',
    height: 150,
    borderColor: '#ccc',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  button: {
    width: '47%',
  },
});

export default LocationSelector;

