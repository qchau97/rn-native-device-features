import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { init } from './helpers/db';
import { PlacesNavigator } from './navigation/PlacesNavigator';
import placesReducer from './store/reducers/placesReducer';

init().then((value) => {
  console.log('Initialized database: ', value);
}).catch(error => {
  console.log('Initializing db failed due to ', error);
});

const rootReducer = combineReducers({
  places: placesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <PlacesNavigator />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
