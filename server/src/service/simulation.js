import _ from 'lodash';
import { EventEmitter } from 'events';

import * as COLOR from '../../../common/src/constants/color';

const defaultColors = [
  COLOR.BLUE,
  COLOR.BLUE,
  COLOR.BLUE,
  COLOR.BLUE,
];

const defaultSimulation = {
  colors: defaultColors,
  state: { started: false },
};

const eventEmitter = new EventEmitter();

class SimulationService {

  constructor() {
    this.simulations = {};
  }

  start(ip, ticks) {
    const simulation = this._get(ip);
    simulation.state.started = true;
    this.simulations[ip] = simulation;

    setTimeout(function () {
      this.simulations[ip].started = false;
    }, 1000 * ticks);
  }

  update(ip, playerId, color) {
    const now = this._get(ip);

    if (now && now.state.started) {
      now.colors[playerId] = color;
      this.simulations[ip] = now;

      eventEmitter.emit('update', ip);
    }
  }

  status(ip) {
    return this._transform(this._get(ip).colors);
  }

  _get(ip) {
    return _.assign([], this.simulations[ip] || defaultSimulation);
  }

  _transform(colors) {
    return _.map(colors, (color, name) => ({ name, color }));
  }

  onUpdate(listener) {
    eventEmitter.addListener('update', listener);
  }

  offUpdate(listener) {
    eventEmitter.removeListener('update', listener);
  }

}

export default new SimulationService();
