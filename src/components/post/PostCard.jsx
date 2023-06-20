import React from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../ProfileImage";
import { formatDate } from "../../utils/formatdate";
import { useState } from "react";
import { EditPostIcon, EllipsesMenuIcon, TrashIcon } from "../../assets/icons";
import { deleteUserPost } from "../../redux/slices/postsSlice";

function PostCard({ postData }) {
  const { allUsers } = useSelector((state) => state.allUsers);
  const { user, token } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();

  function handleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  const isThisUsersPost = postData.username === user.username;

  const currentPostUser = allUsers.find(
    (twitifyUser) => twitifyUser.username === postData.username
  );

  const dateAndTime = formatDate(postData.createdAt);

  function handlePostClick() {
    if (isThisUsersPost && isMenuOpen) {
      setIsMenuOpen(false);
    }
  }

  function handleDeletePostBtnClick(event) {
    event.stopPropagation();
    dispatch(deleteUserPost({ postID: postData._id, token }));
  }

  return (
    <div
      className="relative p-4 border-y border-solid border-darkerGray grid grid-cols-[auto_auto_1fr] grid-rows-[auto_auto]  gap-x-4 gap-y-2 justify-start items-center"
      onClick={handlePostClick}
    >
      <div className="col-start-1 col-end-2 w-fit">
        <ProfileImage
          userImage={currentPostUser.profileImg}
          userFirstName={currentPostUser.firstName}
        />
      </div>

      <div className="row-start-1 row-end-2 col-start-3 col-end-4 self-start text-xs text-darkGray mt-2">
        {dateAndTime}
      </div>

      <div className="flex flex-col col-start-2 col-end-3 row-start-1 row-end-2">
        <p className="text-lg font-bold">{`${currentPostUser.firstName} ${currentPostUser.lastName}`}</p>
        <p className="text-sm text-darkGray">{`@${postData.username}`}</p>
      </div>

      <div className="col-start-2 col-end-4 row-start-2 row-end-3">
        <p>{postData.content}</p>
      </div>

      {/* User's Post Options */}
      {isThisUsersPost && (
        <div
          className="absolute top-3 right-3 p-1 select-none hover:bg-transparentWhite rounded-full text-darkGray cursor-pointer"
          onClick={handleMenuClick}
        >
          <EllipsesMenuIcon />
        </div>
      )}
      {isThisUsersPost && isMenuOpen && (
        <div className="bg-black absolute top-6 right-12 w-32 border border-solid border-darkerGray z-10 rounded-lg overflow-hidden text-sm">
          <div className="py-2 px-3 flex items-center gap-1 cursor-pointer hover:bg-transparentWhite">
            <EditPostIcon /> Edit Post
          </div>
          <div
            className="py-2 px-3 text-red-500 flex items-center gap-1 cursor-pointer hover:bg-transparentWhite"
            onClick={handleDeletePostBtnClick}
          >
            <TrashIcon /> Delete Post
          </div>
        </div>
      )}
    </div>
  );
}

export default PostCard;
