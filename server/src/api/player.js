import express from 'express';
import PlayerService from '../service/player';

var server = express();

server.post('/register', (req, res) => {
  const { player } = req.body;

  const id = PlayerService.create(player);

  res.json({ id });
  res.end();
});
server.get('/list', (req, res) => {

  const players = PlayerService.all();

  res.json(players);
  res.end();
});

export default server;
