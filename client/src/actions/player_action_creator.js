import * as RoundService from '../services/round_service';
import { SET_NAME, SET_COLOR } from './index';

export function setName(id, name) {
  return dispatch => {
    dispatch({ type: SET_NAME, id, name });
  };
}

export function setColor(roundId, id, color) {
  return dispatch =>
    RoundService.update(roundId, id, color).then(() =>
      dispatch({ type: SET_COLOR, id, color }));
}
