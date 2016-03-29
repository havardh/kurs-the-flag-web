import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import errors from './error_reducer';
import players from './players_reducer';
import round from './round_reducer';

export default combineReducers({
  errors,
  players,
  round,
  routing: routerReducer,
});
