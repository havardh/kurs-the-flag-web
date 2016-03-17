import express from 'express';
import _ from 'lodash';

import * as COLOR from '../constants/color';
import SimulationService from '../service/simulation';

const server = express();

server.get('/:ip/status', (req, res) => {
  const { ip } = req.params;

  const status = SimulationService.status(ip);

  res.json(status);
  res.end();
});

server.post('/:ip/update/:playerId', (req, res) => {
  const { ip, playerId } = req.params;
  const { color } = req.body;

  SimulationService.update(ip, playerId, color);
  res.end();
});

export default server;
