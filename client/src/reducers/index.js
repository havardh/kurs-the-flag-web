import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import errors from './error_reducer';
import players from './players_reducer';

export default combineReducers({
  errors,
  players,
  routing: routerReducer,
});
