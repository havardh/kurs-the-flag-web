import _ from "lodash";
import * as websocket from "websocket";
import Promise from "bluebird";
import http from "http";

import simulation from '../service/simulation';

const WebSocketServer = websocket.server;

function dispatch(ip, action) {

  switch (action.type) {
    case "/set/color":
      simulation.update(ip, 0, action.color);
      break;
  }
}

var server = http.createServer(function(request, response) {
  console.log((new Date()) + ' Received request for ' + request.url);
  response.writeHead(404);
  response.end();
});

server.listen(3004, () => console.log((new Date()) + ' Server is listening on port 3004'));

const wsServer = new WebSocketServer({
  httpServer: server,
  autoAcceptConnections: false,
});

wsServer.on("request", (request) => {

  var connection = request.accept('echo-protocol', request.origin);
  console.log((new Date()) + ' Connection accepted.');

  const ip = connection.socket.remoteAddress;

  simulation.onUpdate(() => {
    const status = simulation.status(ip);
    connection.send(JSON.stringify(status));
  });

  connection.on('message', message => {

    if (message.type === 'utf8') {
      const action = JSON.parse(message.utf8Data);
      dispatch(ip, action);

    } else if (message.type === 'binary') {
      connection.sendBytes(message.binaryData);
    }
  });

  connection.on('close', (reasonCode, description) => {
    console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
  });
});
