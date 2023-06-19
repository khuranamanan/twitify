import React from "react";
import { useSelector } from "react-redux";
import ProfileImage from "../ProfileImage";

function PostCard({ postData }) {
  const { allUsers } = useSelector((state) => state.allUsers);

  const currentPostUser = allUsers.find(
    (twitifyUser) => twitifyUser.username === postData.username
  );

  const date = postData.createdAt;

  return (
    <div className="p-4 border-y border-solid border-darkerGray grid grid-cols-[auto_auto_1fr] grid-rows-[auto_auto]  gap-x-4 gap-y-2 justify-start items-center">
      <div className="col-start-1 col-end-2 w-fit">
        <ProfileImage
          userImage={currentPostUser.profileImg}
          userFirstName={currentPostUser.firstName}
        />
      </div>

      <div className="row-start-1 row-end-2 col-start-3 col-end-4 self-start text-xs text-darkGray mt-2">
        {date}
      </div>

      <div className="flex flex-col col-start-2 col-end-3 row-start-1 row-end-2">
        <p className="text-lg font-bold">{`${currentPostUser.firstName} ${currentPostUser.lastName}`}</p>
        <p className="text-sm text-darkGray">{`@${postData.username}`}</p>
      </div>

      <div className="col-start-2 col-end-4 row-start-2 row-end-3">
        <p>{postData.content}</p>
      </div>
    </div>
  );
}

export default PostCard;
