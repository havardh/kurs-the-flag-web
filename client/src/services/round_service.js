import axios from 'axios';

export function status(id) {
  return axios.get(`/api/round/${id}/status`);
}

export function update(id, playerId, color) {
  return axios.post(
    `/api/round/${id}/update/${playerId}`,
    { color }
  );
}
