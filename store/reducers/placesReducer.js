import Place from "../../models/place";
import { ADD_PLACE } from "../actions/places";

const INITIAL_STATE = {
  places: [],
};

const placesReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_PLACE:
      const newPlace = new Place(new Date().toString(), action.payload.title);
      return {
        places: state.places.concat(newPlace),
      }
    default:
      return state;
  }
};

export default placesReducer;