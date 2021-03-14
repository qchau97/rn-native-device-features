import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import ImageSelector from '../components/ImageSelector';
import LocationSelector from '../components/LocationSelector';
import { Colors } from '../constants/Colors';
import { addPlace } from '../store/actions/places';

const NewPlaceScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };

  const handlePlaceSaved = async () => {
    try {
      await dispatch(addPlace(title, selectedImage));
    } catch (error) {
      console.log('handlePlaceSaved() error: ',error.message);
    }
    navigation.goBack();
  };

  const handleImageTaken = (imagePath) => {
    setSelectedImage(imagePath);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          value={title}
          onChangeText={handleTitleChange}
        />
        <ImageSelector onImageTaken={handleImageTaken} />
        <LocationSelector navigation={navigation} route={route} />
        <Button title='Save Place' color={Colors.primary} onPress={handlePlaceSaved} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export const screenOptions = navigationData => {
  return {
    headerTitle: 'Add Place',
  }
};

export default NewPlaceScreen;

