import Place from "../../models/place";
import { ADD_PLACE, GET_PLACES } from "../actions/places";

const INITIAL_STATE = {
  places: [],
};

const placesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(action.payload.id.toString(), action.payload.title, action.payload.image);
      return {
        places: state.places.concat(newPlace),
      }
    case GET_PLACES:
      return {
        places: action.payload.places.map(place => new Place(place.id.toString(), place.title, place.imageUri))
      }
    default:
      return state;
  }
};

export default placesReducer;