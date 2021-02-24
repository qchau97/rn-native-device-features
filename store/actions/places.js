import RNFS from 'react-native-fs';
import { fetchPlaces, insertPlace } from '../../helpers/db';

export const ADD_PLACE = 'ADD_PLACE';
export const GET_PLACES = 'GET_PLACES';

export const addPlace = (title, image) => {
  return async dispatch => {
    const imageName = image.split('/').pop();
    const newPath = `file://${RNFS.DocumentDirectoryPath}/${imageName}`;

    try {
      await RNFS.moveFile(image, newPath);
      const dbResult = await insertPlace(title, newPath, 'Dummy address', 15.6, 12.3);
      // console.log('insertPlace() returns data: ', dbResult);
      dispatch({
        type: ADD_PLACE,
        payload: {
          id: dbResult.insertId,
          title,
          image: newPath,
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