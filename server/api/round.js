import express from 'express';
import _ from 'lodash';

import * as COLOR from '../constants/color';
import RoundService from '../service/round';
import simulationApi from './simulation';

var server = express();

server.use('/simulate', simulationApi);

server.post('/create', (req, res) => {
  const { players } = req.body;

  const id = RoundService.create(players);

  res.json({ id });
  res.end();
});

server.get('/:id/start', (req, res) => {
  const { id } = req.params;

  RoundService.start(id, 10, 1000);

  res.end();
});

server.get('/:id/stop', (req, res) => {
  const { id } = req.params;

  RoundService.stop(id);

  res.end();
});

server.get('/:id/status', (req, res) => {
  const { id } = req.params;

  const status = RoundService.status(id);

  res.json(status);
  res.end();
});

server.post('/:id/update/:playerId', (req, res) => {
  const { id, playerId } = req.params;
  const { color } = req.body;

  if (!RoundService.hasPlayer(id, playerId)) {
    res.status(404).end();
  }

  if (!COLOR.hasOwnProperty(color)) {
    res.status(400).end();
  }

  RoundService.update(id, playerId, color);
  res.end();
});

export default server;
