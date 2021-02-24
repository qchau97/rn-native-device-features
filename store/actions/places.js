import RNFS from 'react-native-fs';

export const ADD_PLACE = 'ADD_PLACE';

export const addPlace = (title, image) => {
  return async dispatch => {
    const imageName = image.split('/').pop();
    console.log(imageName);
    const newPath = `file://${RNFS.DocumentDirectoryPath}/${imageName}`;
    console.log(newPath);

    try {
      await RNFS.moveFile(image, newPath);
    } catch (error) {
      console.log(error);
      throw error;
    }

    dispatch({
      type: ADD_PLACE,
      payload: {
        title,
        image: newPath,
      }
    })
  }
}