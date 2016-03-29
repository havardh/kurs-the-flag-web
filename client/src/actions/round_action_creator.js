import _ from 'lodash';
import { push } from 'react-router-redux';

import * as RoundService from '../services/round_service';
import { SET_NAME, SET_COLOR, START_ROUND, ERROR } from './';

export function startRound(teams) {
  return dispatch =>
    RoundService.create(...teams)
      .then(({ data }) => {
        dispatch({ type: START_ROUND, data });
        dispatch(push(`/rounds/${data.id}`));
      })
      .catch(({ data }) => dispatch({ type: ERROR, data }));
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
