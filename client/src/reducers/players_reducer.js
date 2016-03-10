import _ from 'lodash';
import { SET_NAME, SET_COLOR } from '../actions';

function replaceAt(iterable, i, o) {
  return _.map(iterable, (item, j) => i === j ? _.assign({}, item, o) : item);
}

export default function players(state = [{}, {}, {}, {}], { type, id, name, color } = {}) {
  console.log(type, id, name, color);

  switch (type) {
    case SET_NAME:
      return replaceAt(state, id, { name });

    case SET_COLOR:
      return replaceAt(state, id, { color });

    default:
      return state;
  }
}
