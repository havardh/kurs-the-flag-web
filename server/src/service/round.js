import _ from 'lodash';
import { EventEmitter } from 'events';

import * as COLOR from '../../../common/src/constants/color';
import * as StatsService from './stats';
import SimulationService from './simulation';

const eventEmitter = new EventEmitter();
const { assert } = console;

class RoundService {

  constructor() {
    this.rounds = [];
    this.onGoingTimeouts = {};
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
      ticksLeft: 100,
      ticks: [this.startingColors(players)],
    });

    return id;
  }

  startingColors(players) {
    return _.map([0, 1,  2, 3], i => {
      const ip = players[i];
      const color = _.get(SimulationService.status(ip), "[0].color");
      return color;
    });
  }

  start(id, numTicks, tickLength) {
    this._tick(id, numTicks - 1, tickLength);
    eventEmitter.emit('start', id);
    console.log('start emitted');
  }

  stop(id) {
    if (this.onGoingTimeouts[id]) {
      clearTimeout(this.onGoingTimeouts[id]);
      delete this.onGoingTimeouts[id];
      eventEmitter.emit('stop', id);
    }
  }

  ticksLeft(id) {
    return this.rounds[id].ticksLeft;
  }

  isActive(id) {
    return !!this.onGoingTimeouts[id];
  }

  findLastRoundDetails(ip) {
    const roundId = _.findLastIndex(this.rounds,
      (round) => !!_.find(round.players, v => v === ip));

    if (roundId !== -1) {
      const playerId = _.findIndex(this.rounds[roundId].players, v => v === ip);

      if (playerId !== -1) {
        return { roundId, playerId };
      }
    }

    return undefined;
  }

  findLastActiveRoundDetails(ip) {
    const roundId = _.findLastIndex(this.rounds,
      (round, id) => !!_.find(round.players, v => v === ip) && this.isActive(id));

    if (roundId !== -1) {
      const playerId = _.findIndex(this.rounds[roundId].players, v => v === ip);

      if (playerId !== -1) {
        return { roundId, playerId };
      }
    }

    return undefined;
  }

  stats(id) {
    if (this.rounds[id].ticksLeft > 0) {
      return StatsService.getScore(
        _.take(this.rounds[id].ticks, _.size(this.rounds[id].ticks) - 1)
      );
    }
    return StatsService.getScore(this.rounds[id].ticks);
  }

  _tick(id, numTicks, tickLength) {
    assert(/\d+/.test(id), 'round id must be a number');
    this.rounds[id].ticks.push(_.cloneDeep(this._lastTick(id)));
    this.rounds[id].ticksLeft = numTicks;

    if (numTicks >= 0) {
      const recur = () => this._tick(id, numTicks - 1, tickLength);
      const timeoutId = setTimeout(recur, tickLength);
      this.onGoingTimeouts[id] = timeoutId;
    } else {
      this.stop(id);
    }
  }

  hasPlayer(id, playerId) {
    const tick = this._lastTick(id);
    return tick.hasOwnProperty(playerId);
  }

  status(id) {
    return _.map([0,1,2,3], i => {
      return {
        name: this._players(id)[i].name,
        color: this._lastTick(id)[i]
      };
    });
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

  on(event, listener) {
    eventEmitter.addListener(event, listener);
  }

  off(event, listener) {
    eventEmitter.removeListener(event, listener);
  }
}

export default new RoundService();
