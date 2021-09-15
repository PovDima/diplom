import { GET_OFFERS_SUCCESS, GET_OFFER_SUCCESS } from "../actions/offers";

const initialState = {
  offers: [],
  offer: {}
};

export default function offers(state = initialState, action) {
  switch (action.type) {
    case GET_OFFERS_SUCCESS:
      return { ...state, offers: action.offers };
    case GET_OFFER_SUCCESS:
      return { ...state, offer: action.offer }
    default:
      return state;
  }
}
