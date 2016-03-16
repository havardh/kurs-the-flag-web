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

  console.log(roundId, playerId);

  if (roundId) {
    RoundService.update(roundId, playerId, color);
  } else {
    SimulationService.update(ip, 0, color);
  }
}

function handleMessage(ip, { type, name, color }) {
  console.log(ip, type, name, color);
  switch (type) {
    case 'register':
      register(ip, name);
      break;
    case 'update':
      update(ip, name);
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

wsServer.on('request', (request) => {
  const connection = request.accept('echo-protocol', request.origin);
  console.log(`${new Date()} Connection accepted.`);

  const ip = connection.socket.remoteAddress;

  const onSimulationUpdate = ip => {
    if (!RoundService.findLastActiveRoundDetails(ip)) {
      const status = SimulationService.status(ip);
      connection.send(JSON.stringify(status));
      console.log("reply to", ip);
    }
  };

  const onRoundUpdate = roundId => {
    if (RoundService.findLastActiveRoundDetails(ip).roundId == roundId) {
      const status = RoundService(roundId);
      connection.send(JSON.stringify(status));
    }
  };

  SimulationService.onUpdate(onSimulationUpdate);
  RoundService.onUpdate(onRoundUpdate);

  connection.on('message', message => {
    console.log(message);
    if (message.type === 'utf8') {
      const action = JSON.parse(message.utf8Data);
      handleMessage(ip, action);
    } else if (message.type === 'binary') {
      connection.sendBytes(message.binaryData);
    }
  });

  connection.on('close', (reasonCode, description) => {
    SimulationService.offUpdate(onSimulationUpdate);
    RoundService.offUpdate(onRoundUpdate);
    console.log(`${new Date()} Peer ${connection.remoteAddress} disconnected.`);
  });
});
