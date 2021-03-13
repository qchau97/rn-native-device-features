import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Button, Alert, PermissionsAndroid } from 'react-native';
import { Colors } from '../constants/Colors';
import { } from 'react-native-maps';
import RNLocation from 'react-native-location';

const LocationSelector = () => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState(null);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Allow FitGoalApp to use your location?",
          message:
            "FitGoalApp uses this to provide more relevant and personalized experiences.",
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
    RNLocation.configure({ distanceFilter: null });
    const currentLocation = await RNLocation.getLatestLocation({ timeout: 60000 });
    setPickedLocation({
      lat: currentLocation.latitude,
      lng: currentLocation.longitude,
    });
    if (currentLocation) setIsFetching(false);
  };

  return (
    <View style={styles.locationSelector}>
      <View style={styles.mapPreview}>
        {isFetching ? <ActivityIndicator size='large' color={Colors.primary} /> : <Text>No location chosen yet!</Text>}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default LocationSelector;

