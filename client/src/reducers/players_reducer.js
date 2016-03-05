import _ from "lodash";

export const SET_NAME = Symbol("players/set/name");
export const SET_COLOR = Symbol("players/set/color");

function replaceAt(iterable, i, o) {
  return _.map(iterable, (item, j) => i === j ? _.assign({}, item, o) : item);
}

export function players(state = [{}, {}, {}, {}], {type, id, name, color} = {}) {

  switch (type) {
    case SET_NAME:
      return replaceAt(state, id, {name});

    case SET_COLOR:
      return replaceAt(state, id, {color});

    default:
      return state;
  }
}
