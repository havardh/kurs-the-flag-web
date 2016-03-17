import _ from "lodash";

class PlayerService {

  constructor() {
    this.players = [];
  }

  register(ip, name) {
    const player = {ip, name};
    this.players.push(player);
    return ip;
  }

  list() {
    return this.players;
  }

}

export default new PlayerService();
