import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProfileImage from "../ProfileImage";
import { formatDate } from "../../utils/formatdate";
import { useState } from "react";
import {
  BookmarkPostFilledIcon,
  BookmarkPostIcon,
  EditPostIcon,
  EllipsesMenuIcon,
  HeartFilledIcon,
  HeartIcon,
  TrashIcon,
} from "../../assets/icons";
import {
  deleteUserPost,
  likePost,
  unlikePost,
} from "../../redux/slices/postsSlice";
import { openPostModalForEdit } from "../../redux/slices/modalsSlice";
import { useRef } from "react";
import useClickOutside from "../../hooks/useClickOutside";
import { bookmarkPost, removeBookmarkPost } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router";

const PostCard = forwardRef(({ postData }, ref) => {
  const { allUsers } = useSelector((state) => state.allUsers);
  const { user, token } = useSelector((state) => state.auth);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const cardMenuRef = useRef();
  useClickOutside(cardMenuRef, () => {
    setIsMenuOpen(false);
  });
  const navigate = useNavigate();

  function handleMenuClick() {
    setIsMenuOpen(!isMenuOpen);
  }

  const isThisUsersPost = postData.username === user.username;

  const currentPostUser = allUsers.find(
    (twitifyUser) => twitifyUser.username === postData.username
  );

  const dateAndTime = formatDate(postData.createdAt);

  const isLiked = postData.likes.likedBy.some(
    (twitifyUser) => twitifyUser.username === user.username
  );

  const isBookmarked = user.bookmarks.some((postID) => postID === postData._id);

  function handleEditPostBtnClick(event) {
    event.stopPropagation();
    setIsMenuOpen(false);
    dispatch(openPostModalForEdit({ editPost: postData }));
  }

  function handleDeletePostBtnClick(event) {
    event.stopPropagation();
    setIsMenuOpen(false);
    dispatch(deleteUserPost({ postID: postData._id, token }));
  }

  function handlePostLikeBtnClick() {
    dispatch(likePost({ postID: postData._id, token }));
  }

  function handlePostDislikeBtnClick() {
    dispatch(unlikePost({ postID: postData._id, token }));
  }

  function handleBookmarkPostBtnClick() {
    dispatch(bookmarkPost({ postID: postData._id, token }));
  }

  function handleRemoveBookmarkPostBtnClick() {
    dispatch(removeBookmarkPost({ postID: postData._id, token }));
  }

  const postLikeUnlikeButton = (
    <button
      onClick={(e) => {
        e.stopPropagation();
        isLiked ? handlePostDislikeBtnClick() : handlePostLikeBtnClick();
      }}
      className={`relative p-2 ${
        isLiked && "text-rose-600"
      }  hover:bg-transparentBlack2 dark:hover:bg-transparentWhite hover:text-rose-600 rounded-full transition`}
    >
      {isLiked ? <HeartFilledIcon /> : <HeartIcon />}{" "}
      <span className="absolute right-[-50%] top-0 bottom-0 p-2">
        {!!postData.likes.likeCount && postData.likes.likeCount}
      </span>
    </button>
  );

  const postBookmarkUnbookmarkButton = (
    <button
      className={`p-2 ${
        isBookmarked && "text-cyan"
      }  hover:bg-transparentBlack2 dark:hover:bg-transparentWhite hover:text-cyan rounded-full transition`}
      onClick={(e) => {
        e.stopPropagation();
        isBookmarked
          ? handleRemoveBookmarkPostBtnClick()
          : handleBookmarkPostBtnClick();
      }}
    >
      {isBookmarked ? <BookmarkPostFilledIcon /> : <BookmarkPostIcon />}
    </button>
  );

  function handleNavigateToProfile(e) {
    e.stopPropagation();
    navigate(`/profile/${postData.username}`);
  }

  return (
    <div
      className="relative p-4 border-b border-solid border-darkGray dark:border-darkerGray grid grid-cols-[auto_auto_1fr] grid-rows-[auto_auto_auto] gap-x-3 gap-y-2 justify-start items-center"
      ref={ref}
    >
      <div
        className="col-start-1 col-end-2 w-fit cursor-pointer select-none"
        onClick={handleNavigateToProfile}
      >
        <ProfileImage
          userImage={currentPostUser?.profileImg}
          userFirstName={currentPostUser?.firstName}
        />
      </div>

      <div className="row-start-1 row-end-2 col-start-3 col-end-4 self-start text-[0.7rem] text-darkerGray dark:text-darkGray mt-2 mr-9 sm:text-xs">
        {dateAndTime}
      </div>

      <div
        className="flex flex-col col-start-2 col-end-3 row-start-1 row-end-2 cursor-pointer select-none"
        onClick={handleNavigateToProfile}
      >
        <p className="text-base font-bold sm:text-lg hover:underline underline-offset-2">{`${currentPostUser?.firstName} ${currentPostUser?.lastName}`}</p>
        <p className="text-xs text-darkerGray dark:text-darkGray sm:text-sm">{`@${postData.username}`}</p>
      </div>

      <div className="col-start-2 col-end-4 row-start-2 row-end-3 flex flex-col gap-2">
        <p className="text-sm sm:text-base">{postData.content}</p>
        {postData.media && (
          <div className="overflow-hidden flex justify-center items-center aspect-video w-full object-contain rounded-lg ">
            {postData.media.type === "image" ? (
              <img
                src={postData.media.url}
                alt="Post media"
                className="h-full object-contain rounded-lg"
              />
            ) : (
              <video controls>
                <source
                  src={postData.media.url}
                  type="video/mp4"
                  className="h-full rounded-lg"
                />
              </video>
            )}
          </div>
        )}
      </div>

      {/* Buttons */}
      <div className="col-start-2 col-end-4 row-start-3 row-end-4 text-sm text-darkerGray dark:text-darkGray flex justify-around">
        {postBookmarkUnbookmarkButton}
        {postLikeUnlikeButton}
      </div>

      {/* User's Post Options */}
      {isThisUsersPost && (
        <div
          className="absolute top-3 right-3 p-1 select-none hover:bg-transparentBlack2 dark:hover:bg-transparentWhite rounded-full text-darkerGray dark:text-darkGray cursor-pointer"
          onClick={handleMenuClick}
          ref={cardMenuRef}
        >
          <EllipsesMenuIcon />
        </div>
      )}
      {isThisUsersPost && isMenuOpen && (
        <div className="bg-white dark:bg-black absolute top-6 right-12 w-32 border border-solid border-darkGray dark:border-darkerGray z-10 rounded-lg overflow-hidden text-sm">
          <div
            className="py-2 px-3 flex items-center gap-1 cursor-pointer hover:bg-transparentBlack2 dark:hover:bg-transparentWhite"
            onClick={handleEditPostBtnClick}
          >
            <EditPostIcon /> Edit Post
          </div>
          <div
            className="py-2 px-3 text-red-500 flex items-center gap-1 cursor-pointer hover:bg-transparentBlack2 dark:hover:bg-transparentWhite"
            onClick={handleDeletePostBtnClick}
          >
            <TrashIcon /> Delete Post
          </div>
        </div>
      )}
    </div>
  );
});

export default PostCard;
