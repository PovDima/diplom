import { GET_OFFERS_SUCCESS } from "../actions/offers";

const initialState = {
  offers: [],
};

export default function offers(state = initialState, action) {
  switch (action.type) {
    case GET_OFFERS_SUCCESS:
      return { offers: action.offers };
    default:
      return state;
  }
}
