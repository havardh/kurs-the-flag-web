// eslint-disable no-console
import * as websocket from 'websocket';
import http from 'http';

import PlayerService from '../service/player';
import RoundService from '../service/round';
import SimulationService from '../service/simulation';

const WebSocketServer = websocket.server;

function register(ip, name) {
  PlayerService.register(ip, name);
}

function update(ip, color) {
  const { roundId, playerId } = RoundService.findLastActiveRoundDetails(ip) || {};

  if (roundId) {
    RoundService.update(roundId, playerId, color);
  } else {
    SimulationService.update(ip, 0, color);
  }
}

function handleMessage(ip, { type, name, color }) {
  switch (type) {
    case 'register':
      register(ip, name);
      break;
    case 'update':
      update(ip, color);
      break;
    default:
      break;
  }
}

const server = http.createServer((request, response) => {
  console.log(`${new Date()} Received request for ${request.url}`);
  response.writeHead(404);
  response.end();
});

server.listen(3004, () => console.log(`${new Date()} Server is listening on port 3004`));

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

function accept(request) {
  try {
    const connection = request.accept(null, request.origin);
    console.log(`${new Date()} Connection accepted.`);
    return connection;
  } catch (e) {
    console.log('Could not accept connection:', e);
  }
  return undefined;
}

wsServer.on('request', (request) => {
  const connection = accept(request);

  const ip = connection.socket.remoteAddress;

  const onSimulationUpdate = clientIp => {
    if (ip === clientIp && !RoundService.findLastActiveRoundDetails(ip)) {
      const status = SimulationService.status(ip);
      connection.send(JSON.stringify(status));
    }
  };

  const onRoundUpdate = roundId => {
    if (RoundService.findLastActiveRoundDetails(ip).roundId === roundId) {
      const status = RoundService.status(roundId);
      connection.send(JSON.stringify(status));
    }
  };

  SimulationService.onUpdate(onSimulationUpdate);
  RoundService.onUpdate(onRoundUpdate);

  connection.on('message', message => {
    if (message.type === 'utf8') {
      try {
        const action = JSON.parse(message.utf8Data);
        handleMessage(ip, action);
      } catch (e) {
        console.log('Recevied non-JSON message', message);
      }
    } else if (message.type === 'binary') {
      console.log('Recevied non-JSON message', message);
    }
  });

  connection.on('close', () => {
    SimulationService.offUpdate(onSimulationUpdate);
    RoundService.offUpdate(onRoundUpdate);
    console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected.`);
  });
});
