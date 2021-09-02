import { LOGIN_USER_SUCCESS, LOGOUT_USER_SUCCESS } from "../actions/auth";
import { SET_USER_SUCCESS } from "../actions/users";

const initialState = {
  isAuth: false,
  user: null,
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        user: action.user,
        isAuth: true,
      };
    case LOGOUT_USER_SUCCESS:
      return {
        isAuth: false,
        user: null,
      };
    case SET_USER_SUCCESS:
      return {
        user: action.user,
        isAuth: true,
      };
    default:
      return state;
  }
}
