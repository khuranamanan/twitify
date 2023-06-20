import axios from "axios";

export function getAllPostsService() {
  return axios.get("/api/posts");
}

export function createPostService(post, token) {
  return axios.post(
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
}

export function deleteUsersPostService(postID, token) {
  return axios.delete(`/api/posts/${postID}`, {
    headers: {
      authorization: token,
    },
  });
}
