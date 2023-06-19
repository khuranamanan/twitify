import React from "react";

function PostCard({ postData }) {
  return (
    <div className="p-4 border-y border-solid border-darkerGray">
      <p>{`@${postData.username}`}</p>
      <p>{postData.content}</p>
    </div>
  );
}

export default PostCard;
