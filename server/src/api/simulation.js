import express from 'express';

import SimulationService from '../service/simulation';

const server = express();

server.post('/:ip/start', (req, res) => {
  const { ip } = req.params;
  const { ticks } = req.body;

  SimulationService.start(ip, ticks);

  res.end();
});

server.get('/:ip/status', (req, res) => {
  const { ip } = req.params;

  const status = SimulationService.status(ip);

  const score = SimulationService.stats(ip);
  const ticks = SimulationService.ticksLeft(ip);

  res.json({ status, score, ticks });
  res.end();
});

server.post('/:ip/update/:playerId', (req, res) => {
  const { ip, playerId } = req.params;
  const { color } = req.body;

  SimulationService.update(ip, playerId, color);
  res.end();
});

export default server;
