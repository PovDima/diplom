import { GET_OFFERS_SUCCESS } from "../actions/statements";

const initialState = {
  statements: [],
};

export default function statements(state = initialState, action) {
  switch (action.type) {
    case GET_OFFERS_SUCCESS:
      return { statements: action.statements };
    default:
      return state;
  }
}
