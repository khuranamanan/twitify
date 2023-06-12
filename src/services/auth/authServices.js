import axios from "axios";

export function logInService(username, password) {
  return axios.post("/api/auth/login", { username, password });
}
