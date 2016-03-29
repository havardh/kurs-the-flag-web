import _ from 'lodash';
import { EventEmitter } from 'events';

import * as COLOR from '../../../common/src/constants/color';
import * as StatsService from './stats';

const eventEmitter = new EventEmitter();
const { assert } = console;

class RoundService {

  constructor() {
    this.rounds = [];
    this.onGoingTimouts = {};
  }

  create(players) {
    assert(players.length === 4, 'a round should contain 4 players');
    assert(_.isString(players[0]), 'a player should be truthy');
    assert(_.isString(players[1]), 'a player should be truthy');
    assert(_.isString(players[2]), 'a player should be truthy');
    assert(_.isString(players[3]), 'a player should be truthy');

    const id = this.rounds.length;

    this.rounds.push({
      players,
      ticks: [[
        COLOR.BLUE,
        COLOR.BLUE,
        COLOR.BLUE,
        COLOR.BLUE,
      ]],
    });

    return id;
  }

  start(id, numTicks, tickLength) {
    this._tick(id, numTicks - 1, tickLength);
  }

  stop(id) {
    if (this.onGoingTimouts[id]) {
      clearTimeout(this.onGoingTimouts[id]);
      delete this.onGoingTimouts[id];
    }
  }

  isActive(id) {
    return !!this.onGoingTimeouts[id];
  }

  findLastActiveRoundDetails(ip) {
    const activeRounds = _.filter(this.rounds,
      (round, id) => this.isActive(id));

    const roundId = _.findLastIndex(activeRounds,
      round => _.find(round.players, 'ip', ip));

    if (roundId !== -1) {
      const playerId = _.findIndex(this.rounds[roundId], 'ip', ip);

      if (playerId !== -1) {
        return { roundId, playerId };
      }
    }

    return undefined;
  }

  stats(id) {
    return StatsService.getScore(this.rounds[id].ticks);
  }

  _tick(id, numTicks, tickLength) {
    this.rounds[id].ticks.push(_.cloneDeep(this._lastTick(id)));

    if (numTicks >= 0) {
      const recur = () => this._tick(id, numTicks - 1, tickLength);
      const timeoutId = setTimeout(recur, tickLength);
      this.onGoingTimouts[id] = timeoutId;
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
        color,
      }
    ));
  }

  update(id, playerId, color) {
    const tick = this._lastTick(id);
    tick[playerId] = color;

    eventEmitter.emit('update', id);
  }

  _players(id) {
    return this.rounds[id].players;
  }

  _lastTick(id) {
    const round = this.rounds[id];
    return _.last(round.ticks);
  }

  onUpdate(listener) {
    eventEmitter.addListener('update', listener);
  }

  offUpdate(listener) {
    eventEmitter.removeListener('update', listener);
  }
}

export default new RoundService();
