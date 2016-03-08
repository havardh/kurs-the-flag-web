import axios from "axios";

const id = 0;

export function update(id, playerId, color) {
  return axios.post(
    "/api/round/" + id + "/update/" + playerId,
    {color}
  );
}
