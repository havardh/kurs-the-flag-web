import _ from 'lodash';

export class PlayerService {

  constructor() {
    this.players = {};
  }

  register(ip, name) {
    const player = { ip, name, online: true };
    this.players[ip] = player;
    return ip;
  }

  unregister(ip) {
    if (this.players[ip]) {
      this.players[ip].online = false;
    }
  }

  get(ip) {
    return this.players[ip] || { ip, name: "Unregistered", online: false};
  }

  list() {
    return _.map(this.players, player => player);
  }

}

export default new PlayerService();
