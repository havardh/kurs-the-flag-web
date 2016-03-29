import _ from 'lodash';
import axios from 'axios';

export function create(...players) {
  return axios.post('/api/round/create', { players });
}

export function start(id) {
  return axios.post(`/api/round/${id}/start`, { ticks: 100 });
}

export function status(id) {
  return axios.get(`/api/round/${id}/status`)
    .then(response => _.defaultsDeep(response, { data: { ticks: 100 } }));
}

export function update(id, playerId, color) {
  return axios.post(
    `/api/round/${id}/update/${playerId}`,
    { color }
  );
}
