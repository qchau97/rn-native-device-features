import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ActivityIndicator, Button, PermissionsAndroid, Text } from 'react-native';
import { Colors } from '../constants/Colors';
import RNLocation from 'react-native-location';
import RcMapView from './RcMapView';

const LocationSelector = ({ navigation }) => {
  const [isFetching, setIsFetching] = useState(false);
  const [pickedLocation, setPickedLocation] = useState(null);

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
    setPickedLocation({
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
  }, [])

  return (
    <View style={styles.locationSelector}>
      <View style={styles.mapContainer}>
        {pickedLocation !== null && <RcMapView navigation={navigation} location={pickedLocation} />}
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

