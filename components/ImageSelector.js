import React, { useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import ImagePicker from 'react-native-image-crop-picker';

const ImageSelector = ({ onImageTaken }) => {
  const [pickedImage, setPickedImage] = useState(null);

  const handleCameraOpen = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
    }).then(image => {
      setPickedImage(image.path);
      onImageTaken(image.path);
    });
  };

  return (
    <View style={styles.imagePicker}>
      <View style={styles.imagePreview}>
        {!pickedImage ? <Text>No image picked yet!</Text> : <Image style={styles.image} source={{ uri: pickedImage }} />}

      </View>
      <Button title='Take Image' color={Colors.primary} onPress={handleCameraOpen} />
    </View>
  );
};

export default ImageSelector;

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
    marginBottom: 15,
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

