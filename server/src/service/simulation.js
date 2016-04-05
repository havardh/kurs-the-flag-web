import _ from 'lodash';
import { EventEmitter } from 'events';
import * as StatsService from './stats';

import {DEFAULT_COLORS} from '../constants/positions';

const defaultSimulation = {
  ticks: [DEFAULT_COLORS],
  ticksLeft: 20,
};

const eventEmitter = new EventEmitter();

class SimulationService {

  constructor() {
    this.simulations = {};
    this.onGoingTimeouts = {};
  }

  start(ip, ticks) {
    const simulation = this._get(ip);
    this.simulations[ip] = simulation;
    this.simulations[ip].ticks = [DEFAULT_COLORS];
    this._tick(ip, ticks);
    eventEmitter.emit('start', ip);
  }

  ticksLeft(ip) {
    return _.get(this.simulations[ip], 'ticksLeft');
  }

  stop(ip) {
    if (this.onGoingTimeouts[ip]) {
      clearTimeout(this.onGoingTimeouts[ip]);
      delete this.onGoingTimeouts[ip];
      eventEmitter.emit('stop', ip);
    }
  }

  _tick(ip, numTicks) {
    this.simulations[ip].ticksLeft = numTicks;
    this.simulations[ip].ticks.push(_.cloneDeep(this._getLastRound(ip)));

    if (numTicks >= 0) {
      const recur = () => this._tick(ip, numTicks - 1, 1000);
      const timeoutId = setTimeout(recur, 1000);
      this.onGoingTimeouts[ip] = timeoutId;
    } else {
      this.stop(ip);
    }
  }

  update(ip, playerId, color) {
    const now = this._get(ip);

    if (now && this.onGoingTimeouts[ip]) {
      _.last(now.ticks)[playerId] = color;
      this.simulations[ip] = now;

      eventEmitter.emit('update', ip);
    }
  }

  status(ip) {
    return this._transform(this._getLastRound(ip));
  }

  stats(ip) {
    if (this.simulations[ip]) {
      return StatsService.getScore(this.simulations[ip].ticks);
    }
    return {};
  }

  _get(ip) {
    return _.assign([], this.simulations[ip] || defaultSimulation);
  }

  _getLastRound(ip) {
    const simulation = this._get(ip);
    return simulation && _.last(simulation.ticks);
  }

  _transform(colors) {
    return _.map(colors, (color, name) => ({ name, color }));
  }

  on(event, listener) {
    eventEmitter.addListener(event, listener);
  }

  off(event, listener) {
    eventEmitter.removeListener(event, listener);
  }

}

export default new SimulationService();
