class PlayerService {

  constructor() {
    this.players = [];
  }

  create(player) {
    const id = this.players.length;

    this.players.push(player);

    return id;
  }

  list() {
    return this.players;
  }

}

export default new PlayerService();
