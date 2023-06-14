import axios from "axios";

export function getAllUsersService() {
  return axios.get("/api/users");
}
