import axios from "axios";

export function getAllPostsService() {
  return axios.get("/api/posts");
}

export const createPostService = (post, token) =>
  axios.post(
    "/api/posts",
    {
      postData: post,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );
