import _ from 'lodash';
import { RECEIVE_STATS, RECEIVE_TICKS, SET_NAME, SET_COLOR } from '../actions';

export default function round(state = {}, { type, data }) {
  if (_.includes([SET_NAME, SET_COLOR], type)) {
    return _.assign({}, state, { players: exports.players(state.players, { type, data }) });
  }

  if (type === RECEIVE_STATS) {
    return _.assign({}, state, { stats: data });
  }

  if (type === RECEIVE_TICKS) {
    return _.assign({}, state, { ticks: data });
  }

  return state;
}

function replaceAt(iterable, i, o) {
  return _.map(iterable, (item, j) => i === j ? _.assign({}, item, o) : item);
}

export function players(state = [{}, {}, {}, {}], { type, data } = {}) {
  switch (type) {
    case SET_NAME:
      return replaceAt(state, data.id, { name: data.name });

    case SET_COLOR:
      return replaceAt(state, data.id, { color: data.color });

    default:
      return state;
  }
}
