import { RECEIVE_PLAYERS } from '../actions';

export default function players(state = [], { type, data } = {}) {
  if (type === RECEIVE_PLAYERS) {
    return data;
  }

  return state;
}
