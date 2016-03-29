import _ from 'lodash';
import { EventEmitter } from 'events';

import * as COLOR from '../../../common/src/constants/color';

const defaultColors = [
  COLOR.BLUE,
  COLOR.BLUE,
  COLOR.BLUE,
  COLOR.BLUE,
];

const eventEmitter = new EventEmitter();

class SimulationService {

  constructor() {
    this.simulations = {};
  }

  update(ip, playerId, color) {
    const now = this._get(ip);
    now[playerId] = color;
    this.simulations[ip] = now;

    eventEmitter.emit('update', ip);
  }

  status(ip) {
    return this._transform(this._get(ip));
  }

  _get(ip) {
    return _.assign([], this.simulations[ip] || defaultColors);
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
