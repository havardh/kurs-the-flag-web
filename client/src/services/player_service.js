import axios from 'axios';

export function list() {
  return axios.get('/api/player/list');
}
