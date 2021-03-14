import Place from "../../models/place";
import { ADD_PLACE, GET_PLACES } from "../actions/places";

const INITIAL_STATE = {
  places: [],
};

const placesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(
        action.payload.id.toString(),
        action.payload.title,
        action.payload.image,
        action.payload.address,
        action.payload.coords.lat,
        action.payload.coords.lng,
      );
      return {
        places: state.places.concat(newPlace),
      }
    case GET_PLACES:
      return {
        places: action.payload.places.map(place => new Place(
          place.id.toString(),
          place.title,
          place.imageUri,
          place.address,
          place.lat,
          place.lng,
        ))
      }
    default:
      return state;
  }
};

export default placesReducer;