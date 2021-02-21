import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Colors } from '../constants/Colors';

const NewPlaceScreen = () => {
  const [title, setTitle] = useState('');

  const handleTitleChange = (newTitle) => {
    setTitle(newTitle);
  };

  const handlePlaceSaved = () => { };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} value={title} onChangeText={handleTitleChange} />
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

