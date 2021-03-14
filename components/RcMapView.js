import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
// import ENV from '../env';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Colors } from '../constants/Colors';

const RcMapView = ({ location, navigation, style }) => {
  // const apiKey = ENV.googleApiKey;
  const { width, height } = Dimensions.get('window');
  const ASPECT_RATIO = width / height;
  const LATITUDE = location.lat;
  const LONGITUDE = location.lng;
  const LATITUDE_DELTA = 0.0922;
  const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

  // For display an image preview (optional)
  // const imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.lat},${location.lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.lat},${location.lng}&key=${apiKey}`;

  const initialLocation = {
    latitude: LATITUDE,
    longitude: LONGITUDE,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  };

  return (
    <MapView
      style={styles.mapView}
      provider={PROVIDER_GOOGLE}
      loadingEnabled={true}
      loadingIndicatorColor={Colors.primary}
      region={initialLocation}
      // onPress={e => console.log(e.nativeEvent.coordinate)}
      onPress={() => { navigation.navigate('Map') }}
    >
      <Marker
        coordinate={{ latitude: initialLocation.latitude, longitude: initialLocation.longitude }}
        title='Your Current Location'
      />
    </MapView>
  )
}

export default RcMapView;

const styles = StyleSheet.create({
  mapView: {
    width: '100%',
    height: 150,
  },
});
