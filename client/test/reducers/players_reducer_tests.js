import deepFreeze from "deep-freeze";

import {
  players,
  SET_NAME,
  SET_COLOR
} from "../../src/reducers/players_reducer";

describe("PlayersReducer", () => {
  let defaultState;
  beforeEach(() => defaultState = deepFreeze(players()));

  it("should default to a list of four players", () => {
    expect(defaultState.length).to.equal(4);
  });

  it("should set name of player", () => {
    const state = players(defaultState, {
      type: SET_NAME,
      id: 0,
      name: "Player Name"
    });

    expect(state[0].name).to.equal("Player Name");
  });

  it("should set color of player", () => {
    const state = players(defaultState, {
      type: SET_COLOR,
      id: 2,
      color: "RED"
    });

    expect(state[2].color).to.equal("RED");
  });

});
