import _ from "lodash";
import * as RoundService from "../services/round_service";
import {SET_NAME, SET_COLOR} from "./index"

export function fetchStatus(id) {
  return dispatch => {
    return RoundService.status(id).then(({data}) => {
      _.map(data, ({color, name}, id) => {
        dispatch({type: SET_COLOR, id, color});
        dispatch({type: SET_NAME, id, name});
      });
    });
  }
}
