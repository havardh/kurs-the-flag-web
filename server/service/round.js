import _ from "lodash";

import * as COLOR from "../constants/color";

class RoundService {

  constructor() {
    this.rounds = [];
    this.onGoingTimouts = {};
  }

  create(players) {
    console.assert(players.length == 4, "a round should contain 4 players");

    const [p1, p2, p3, p4] = players;

    const id = this.rounds.length;

    this.rounds.push([{
      p1: COLOR.BLUE,
      p2: COLOR.BLUE,
      p3: COLOR.BLUE,
      p4: COLOR.BLUE,
    }]);

    return id;
  }

  start(id, ticks, tickLength) {
    this._tick(id, ticks-1, tickLength);
  }

  stop(id) {
    if (this.onGoingTimouts[id]) {
      clearTimeout(this.onGoingTimouts[id]);
      delete this.onGoingTimouts[id];
    }
  }

  _tick(id, ticks, tickLength) {

    this.rounds[id].push(_.cloneDeep(this._lastTick(id)));

    if (ticks >= 0) {
      const recur = () => this._tick(id, ticks-1, tickLength);
      const timeoutId = setTimeout(recur, tickLength);
      this.onGoingTimouts[id] = timoutId;
    } else {
      this.stop(id);
    }
  }

  hasPlayer(id, ip) {
    const tick = this._lastTick(id);
    return tick.hasOwnProperty(ip);
  }

  status(id) {
    const tick = this._lastTick(id);
    return _.map(tick, (color, ip) => ({ ip, color }));
  }

  update(id, ip, color) {
    const tick = this._lastTick(id);
    tick[ip] = color;
  }

  _lastTick(id) {
    const round = this.rounds[id];
    return _.last(round);
  }

}

export default new RoundService();
