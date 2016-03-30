import { RECEIVE_PLAYERS } from './';
import { list } from '../services/player_service';

const receivePlayers = players => ({ type: RECEIVE_PLAYERS, data: players });

export function fetchPlayers() {
  return dispatch => list().then(({ data }) => dispatch(receivePlayers(data)));
}
