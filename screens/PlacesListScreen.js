import React, { useCallback, useEffect } from 'react';
import { FlatList, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../components/CustomHeaderButton';
import PlaceItem from '../components/PlaceItem';
import { getPlaces } from '../store/actions/places';

const PlacesListScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const places = useSelector(state => state.places.places);

  const renderPlaceItem = (itemData) => {
    return (
      <PlaceItem
        image={itemData.item.imagePath}
        title={itemData.item.title}
        address={itemData.item.address}
        onSelect={() => navigation.navigate('PlaceDetail',
          {
            placeTitle: itemData.item.title,
            placeId: itemData.item.id
          })}
      />
    )
  };

  const loadPlaces = useCallback(async () => {
    try {
      await dispatch(getPlaces());
    } catch (error) {
      console.log('loadPlaces() error: ', error.message);
    }
  }, [dispatch]);

  useEffect(() => {
    loadPlaces();
  }, [loadPlaces])

  return (
    <FlatList
      keyExtractor={item => item.id}
      data={places}
      renderItem={renderPlaceItem}
    />
  );
};

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

