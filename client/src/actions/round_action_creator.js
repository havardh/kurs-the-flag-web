import _ from 'lodash';

import * as RoundService from '../services/round_service';
import { SET_NAME, SET_COLOR, START_ROUND } from './';

export function startRound(data) {
  return dispatch => {
    console.log('starting round?', data)
    return dispatch({ type: START_ROUND, data });
  }
}

export function fetchStatus(id) {
  return dispatch =>
    RoundService.status(id).then(({ data }) => {
      _.map(data, ({ color, name }, i) => {
        dispatch({ type: SET_COLOR, id: i, color });
        dispatch({ type: SET_NAME, id: i, name });
      });
    });
}
