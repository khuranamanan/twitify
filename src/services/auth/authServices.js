import axios from "axios";

export function logInService(username, password) {
  return axios.post("/api/auth/login", { username, password });
}

export function signUpService(username, password, firstName, lastName) {
  return axios.post("/api/auth/signup", {
    username,
    password,
    firstName,
    lastName,
  });
}
