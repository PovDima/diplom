import { GET_STATEMENTS_SUCCESS, GET_STATEMENT_SUCCESS } from "../actions/statements";

const initialState = {
  statements: [],
  statement: {}
};

export default function statements(state = initialState, action) {
  switch (action.type) {
    case GET_STATEMENTS_SUCCESS:
      return { ...state, statements: action.statements };
    case GET_STATEMENT_SUCCESS:
      return { ...state, statement: action.statement }
    default:
      return state;
  }
}
