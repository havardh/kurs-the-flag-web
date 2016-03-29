import { ERROR } from '../actions';

export default function error(state = [], { type, data }) {
  if (type === ERROR) {
    return state.concat(data);
  }

  return state;
}
