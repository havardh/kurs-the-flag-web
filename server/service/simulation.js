import _ from "lodash";

import * as COLOR from "../constants/color";

const defaultColors= [
  COLOR.BLUE,
  COLOR.BLUE,
  COLOR.BLUE,
  COLOR.BLUE,
];

class SimulationService {

  constructor() {
    this.simulations = {};
  }

  update(ip, playerId, color) {
    const now = this._get(ip);
    now[playerId] = color;
    this.simulations[ip] = now;
  }

  status(ip) {
    console.log(this.simulations);
    return this._transform(this._get(ip));
  }

  _get(ip) {
    return _.assign([], this.simulations[ip] || defaultColors);
  }

  _transform(colors) {
    return _.map(colors, (color, name) => ({name, color}));
  }

}

export default new SimulationService();
