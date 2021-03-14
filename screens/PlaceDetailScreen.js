import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image } from 'react-native';
import { useSelector } from 'react-redux';
import RcMapView from '../components/RcMapView';
import { Colors } from '../constants/Colors';

const PlaceDetailScreen = ({ navigation, route }) => {
  const placeId = route.params ? route.params.placeId : null;
  const selectedPlace = useSelector(state => state.places.places.find(place => place.id === placeId));
  const selectedPlaceCoords = {
    lat: selectedPlace.lat,
    lng: selectedPlace.lng
  };

  const handlePress = () => {
    navigation.navigate('Map', {
      readonly: true,
      initialLocation: selectedPlaceCoords,
    });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: selectedPlace.imagePath }} />
      <View style={styles.locationContainer}>
        <View style={styles.addressContainer}>
          <Text style={styles.address}>{selectedPlace.address}</Text>
        </View>
        <RcMapView
          navigation={navigation}
          style={styles.map}
          location={selectedPlaceCoords}
          onPress={handlePress} />
      </View>
    </ScrollView>
  );
};

export const screenOptions = navigationData => {
  return {
    headerTitle: navigationData.route.params ? navigationData.route.params.placeTitle : '',
  }
}

export default PlaceDetailScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  image: {
    height: '35%',
    minHeight: 300,
    width: '100%',
    backgroundColor: '#ccc'
  },
  locationContainer: {
    marginVertical: 20,
    width: '90%',
    maxWidth: 350,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10
  },
  addressContainer: {
    padding: 20
  },
  address: {
    color: Colors.primary,
    textAlign: 'center'
  },
  map: {
    width: '100%',
    maxWidth: 350,
    height: 300,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
});
