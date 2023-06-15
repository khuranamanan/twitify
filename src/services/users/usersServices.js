import axios from "axios";

export function getAllUsersService() {
  return axios.get("/api/users");
}

export function followAUserService(followUserID, token) {
  console.log("from followAUserService", followUserID, token);
  return axios.post(
    `/api/users/follow/${followUserID}`,
    {},
    {
      headers: {
        authorization: token,
      },
    }
  );
}
