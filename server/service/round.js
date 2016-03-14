import _ from 'lodash';

import * as COLOR from '../constants/color';

class RoundService {

  constructor() {
    this.rounds = [];
    this.onGoingTimouts = {};
  }

  create(players) {
    console.assert(players.length == 4, 'a round should contain 4 players');

    const id = this.rounds.length;

    this.rounds.push({
      players: players,
      ticks: [[
        COLOR.BLUE,
        COLOR.BLUE,
        COLOR.BLUE,
        COLOR.BLUE,
      ]]
    });

    return id;
  }

  start(id, ticks, tickLength) {
    this._tick(id, ticks - 1, tickLength);
  }

  stop(id) {
    if (this.onGoingTimouts[id]) {
      clearTimeout(this.onGoingTimouts[id]);
      delete this.onGoingTimouts[id];
    }
  }

  _tick(id, ticks, tickLength) {

    this.rounds[id].ticks.push(_.cloneDeep(this._lastTick(id)));

    if (ticks >= 0) {
      const recur = () => this._tick(id, ticks - 1, tickLength);
      const timeoutId = setTimeout(recur, tickLength);
      this.onGoingTimouts[id] = timoutId;
    } else {
      this.stop(id);
    }
  }

  hasPlayer(id, playerId) {
    const tick = this._lastTick(id);
    return tick.hasOwnProperty(playerId);
  }

  status(id) {
    return _.zipWith(
      this._players(id),
      this._lastTick(id),
      (player, color) => ({
        name: player.name,
        color
      }
    ));
  }

  update(id, playerId, color) {
    const tick = this._lastTick(id);
    tick[playerId] = color;
  }

  _players(id) {
    return this.rounds[id].players;
  }

  _lastTick(id) {
    const round = this.rounds[id];
    return _.last(round.ticks);
  }
}

export default new RoundService();
