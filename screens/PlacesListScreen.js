import React from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/CustomHeaderButton';

const PlacesListScreen = () => {
  return (
    <View>
      <Text>PlacesListScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({});

export const screenOptions = navigationData => {
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title='Add Place'
          iconName={Platform.OS === 'android' ? 'plus-outline' : 'plus'}
          onPress={() => {
            navigationData.navigation.navigate('NewPlace');
          }}
        />
      </HeaderButtons>
    ),
  }
}

export default PlacesListScreen;

