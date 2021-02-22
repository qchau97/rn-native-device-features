import React from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
// import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import ImagePicker from 'react-native-image-crop-picker';

const ImageSelector = () => {
  const handleCameraOpen = () => {
    // launchCamera(
    //   {
    //     mediaType: 'photo',
    //     includeBase64: false,
    //     maxHeight: 200,
    //     maxWidth: 200,
    //   },
    //   (response) => {
    //     console.log(response);
    //   },
    // );
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
    }).then(image => {
      console.log(image);
    });
    console.warn('Take photo');
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        <Text>No image picked yet!</Text>
        <Image style={styles.image} />
      </View>
      <Button title='Take Image' color={Colors.primary} onPress={handleCameraOpen} />
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
  
