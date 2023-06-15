import axios from "axios";

export function getAllPostsService() {
  return axios.get("/api/posts");
}
