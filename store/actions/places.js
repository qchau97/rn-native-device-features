import RNFS from 'react-native-fs';
import { fetchPlaces, insertPlace } from '../../helpers/db';
import ENV from '../../env';

export const ADD_PLACE = 'ADD_PLACE';
export const GET_PLACES = 'GET_PLACES';

export const addPlace = (title, image, location) => {
  return async dispatch => {
    const apiKey = ENV.googleApiKey;
    const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.lat},${location.lng}&key=${apiKey}`;
    const response = await fetch(geocodeUrl);
    if (!response.ok) throw new Error('Something went wrong!');
    const data = await response.json();
    if (!data.results) throw new Error('Something went wrong!');
    const address = data.results[0].formatted_address;

    const imageName = image.split('/').pop();
    const newPath = `file://${RNFS.DocumentDirectoryPath}/${imageName}`;

    try {
      await RNFS.moveFile(image, newPath);
      const dbResult = await insertPlace(title, newPath, address, location.lat, location.lng);
      // console.log('insertPlace() returns data: ', dbResult);
      dispatch({
        type: ADD_PLACE,
        payload: {
          id: dbResult.insertId,
          title,
          image: newPath,
          address,
          coords: {
            lat: location.lat,
            lng: location.lng,
          }
        }
      })
    } catch (error) {
      throw new Error(error);
    }
  }
};

export const getPlaces = () => {
  return async dispatch => {
    try {
      const dbResult = await fetchPlaces();
      // console.log('getPlaces() returns data: ', dbResult);
      dispatch({
        type: GET_PLACES,
        payload: {
          places: dbResult,
        }
      })
    } catch (error) {
      throw new Error(error);
    }
  }
}