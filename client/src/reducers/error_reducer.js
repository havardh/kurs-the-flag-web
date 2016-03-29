import { ERROR } from '../actions'

export default function round(state = [], { type, data }) {
  if (type === ERROR) {
    return state.concat(data);
  }

  return state;
}
