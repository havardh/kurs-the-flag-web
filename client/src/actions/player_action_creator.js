import {SET_NAME, SET_COLOR} from "./index"

export function setName(id, name) {
  return dispatch => {
    dispatch({type: SET_NAME, id, name});
  }
}

export function setColor(id, color) {
  return dispatch => {
    dispatch({type: SET_COLOR, id, color});
  };
}
