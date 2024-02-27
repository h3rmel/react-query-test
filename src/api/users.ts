import axios from "axios";

export function getUser(id: number) {
  return axios
    .get(`http://localhost:3000/users/${id}`)
    .then((response) => response.data);
}
