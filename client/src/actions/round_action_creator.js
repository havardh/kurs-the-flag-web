import _ from 'lodash';
import { push } from 'react-router-redux';

import * as RoundService from '../services/round_service';
import {
  SET_NAME,
  SET_COLOR,
  CREATE_ROUND,
  START_ROUND,
  ERROR,
  RECEIVE_STATS,
  RECEIVE_TICKS,
} from './';

export function setName(id, name) {
  return { type: SET_NAME, data: { id, name } };
}

export function setColor(id, color) {
  return { type: SET_COLOR, data: { id, color } };
}

export function receiveStats(data) {
  return { type: RECEIVE_STATS, data };
}

export function receiveTicks(data) {
  return { type: RECEIVE_TICKS, data };
}

export function boundedSetColor(roundId, id, color) {
  return dispatch =>
    RoundService.update(roundId, id, color)
      .then(() => dispatch(setColor(id, color)))
      .catch(({ data }) => dispatch({ type: ERROR, data }));
}

export function startRound(roundId) {
  return dispatch =>
    RoundService.start(roundId)
      .then(({ data }) => {
        dispatch({ type: START_ROUND, data });
      })
      .catch(({ data }) => dispatch({ type: ERROR, data }));
}

export function createRound(teams) {
  return dispatch =>
    RoundService.create(...teams)
      .then(({ data }) => {
        dispatch({ type: CREATE_ROUND, data });
        dispatch(push(`/rounds/${data.id}`));
      })
      .catch(({ data }) => dispatch({ type: ERROR, data }));
}

export function fetchStatus(id) {
  return dispatch =>
    RoundService.status(id)
      .then(({ data }) => {
        dispatch(receiveStats(data.score));
        dispatch(receiveTicks(data.ticks));
        _(data.status).forEach(({ color, name }, i) => {
          dispatch(setColor(i, color));
          dispatch(setName(i, name));
        });
      })
      .catch(({ data }) => dispatch({ type: ERROR, data }));
}
