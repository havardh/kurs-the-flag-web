import _ from 'lodash';
import { EventEmitter } from 'events';

import * as COLOR from '../../../common/src/constants/color';
import * as StatsService from './stats';
import SimulationService from './simulation';
import PlayerService from './player';

const eventEmitter = new EventEmitter();
eventEmitter.setMaxListeners(100);
const { assert } = console;

export class RoundService {

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
      players: this.getPlayers(players),
      ticksLeft: 100,
      ticks: [this.startingColors(players)],
    });

    return id;
  }

  getPlayers(players) {
    return _.map(players, ip => PlayerService.get(ip));
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
    eventEmitter.emit('start', id, this.rounds[id].players);
    console.log('start emitted');
  }

  stop(id) {
    if (this.onGoingTimeouts[id]) {
      clearTimeout(this.onGoingTimeouts[id]);
      delete this.onGoingTimeouts[id];
      eventEmitter.emit('stop', id, this.rounds[id].players);
    }
  }

  ticksLeft(id) {
    return this.rounds[id].ticksLeft;
  }

  isActive(id) {
    return !!this.onGoingTimeouts[id];
  }

  findLastActiveRoundDetails(ip) {
    for (var roundId = _.size(this.rounds) - 1; roundId >= 0; roundId--) {
      if (this.isActive(roundId)) {
        const playerId = _.findIndex(this.rounds[0].players, { ip });
        if (playerId !== -1) {
          return { roundId, playerId };
        }
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

    eventEmitter.emit('update', id, this.rounds[id].players);
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
