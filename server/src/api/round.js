import express from 'express';

import * as COLOR from '../../../common/src/constants/color';
import RoundService from '../service/round';
import StatsService from '../service/stats';
import simulationApi from './simulation';

const server = express();

server.use('/simulate', simulationApi);

server.post('/create', (req, res) => {
  const { players } = req.body;

  const id = RoundService.create(players);

  res.json({ id });
  res.end();
});

server.post('/:id/start', (req, res) => {
  const { id } = req.params;
  const { ticks } = req.body;

  RoundService.start(id, ticks, 1000);

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
  const score = RoundService.stats(id);

  res.json({ status, score });
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
