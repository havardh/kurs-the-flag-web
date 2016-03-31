import _ from 'lodash';

export class PlayerService {

  constructor() {
    this.players = {};
  }

  register(ip, name) {
    const player = { ip, name };
    this.players[ip] = player;
    return ip;
  }

  list() {
    return _.map(this.players, player => player);
  }

}

export default new PlayerService();
