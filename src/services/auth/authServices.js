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

export function bookmarkPostService(postId, token) {
  return axios.post(
    `/api/users/bookmark/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
}

export function removeBookmarkPostService(postId, token) {
  return axios.post(
    `/api/users/remove-bookmark/${postId}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
}
