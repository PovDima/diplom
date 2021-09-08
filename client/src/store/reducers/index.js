import { combineReducers } from 'redux';
import users from './users';
import offers from './offers';
import statements from './statements';

export default combineReducers({
  users,
  offers,
  statements
})
