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

export function editPostService(editedPost, token) {
  return axios.post(
    `/api/posts/edit/${editedPost._id}`,
    {
      postData: editedPost,
    },
    {
      headers: {
        authorization: token,
      },
    }
  );
}

export function likePostService(postId, token) {
  return axios.post(
    `/api/posts/like/${postId}`,
    {},
    {
      headers: { authorization: token },
    }
  );
}

export function unlikePostService(postId, token) {
  return axios.post(
    `/api/posts/dislike/${postId}`,
    {},
    {
      headers: { authorization: token },
    }
  );
}

export function getUserPostsByUsernameSercive(username) {
  return axios.get(`/api/posts/user/${username}`);
}
