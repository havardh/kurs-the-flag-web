import _ from 'lodash';

import { setColor, setName } from '../actions/round_action_creator';

export function init(store) {
  const W3CWebSocket = require('websocket').w3cwebsocket;

  const client = new W3CWebSocket('ws://localhost:3004/', 'echo-protocol');

  client.onerror = () => console.log('Connection Error');

  client.onopen = () => {
    console.log('Websocket connection is open');

    function send(obj) {
      if (client.readyState === client.OPEN) {
        console.log('Sending:', obj);
        client.send(JSON.stringify(obj));
      }
    }

    window.send = send;
  };

  client.onclose = () => console.log('echo-protocol closing');

  client.onmessage = (message) => {
    console.log(message);
    if (typeof message.data === 'string') {
      const status = JSON.parse(message.data);

      console.log('Recevied:', status);

      _.map(status, ({ color, name }, i) => {
        store.dispatch(setColor(i, color));
        store.dispatch(setName(i, name));
      });
    }
  };
}
