import React from 'react';
import { FlatList, Platform, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import CustomHeaderButton from '../components/CustomHeaderButton';
import PlaceItem from '../components/PlaceItem';

const PlacesListScreen = ({ navigation }) => {
  const places = useSelector(state => state.places.places);

  const renderPlaceItem = (itemData) => {
    return (
      <PlaceItem
        image={itemData.item.imagePath}
        title={itemData.item.title}
        address=''
        onSelect={() => navigation.navigate('PlaceDetail',
          {
            placeTitle: itemData.item.title,
            placeId: itemData.item.id
          })}
      />
    )
  };

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={places}
      renderItem={renderPlaceItem}
    />
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
          iconName={Platform.OS === 'android' ? 'add-outline' : 'add'}
          onPress={() => {
            navigationData.navigation.navigate('NewPlace');
          }}
        />
      </HeaderButtons>
    ),
  }
}

export default PlacesListScreen;

