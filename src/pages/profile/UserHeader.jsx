import React from "react";
import { UrlIcon } from "../../assets/icons";
import defaultProfileImg from "../../assets/defaultProfileImg.png";
import { useDispatch, useSelector } from "react-redux";
import { followAUser, unfollowAUser } from "../../redux/slices/allUsersSlice";
import { useState } from "react";
import EditProfileModal from "./components/EditProfileModal";

function UserHeader({
  profilePageUser,
  isThisUsersProfilePage,
  isUserFollowingThisUser,
}) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [editProfileModal, setEditProfileModal] = useState(false);

  function handleFollow() {
    dispatch(followAUser({ followUserID: profilePageUser._id, token: token }));
  }

  function handleUnfollow() {
    dispatch(
      unfollowAUser({ followUserID: profilePageUser._id, token: token })
    );
  }

  function handleEditProfileBtnClick() {
    setEditProfileModal(true);
  }

  function renderCTAButton() {
    if (isThisUsersProfilePage) {
      return (
        <button
          className="text-lg font-semibold rounded-full px-4 py-1 text-white border border-darkerGray hover:opacity-90"
          onClick={handleEditProfileBtnClick}
        >
          Edit Profile
        </button>
      );
    } else if (isUserFollowingThisUser) {
      return (
        <button
          className="text-lg font-semibold rounded-full px-4 py-1 text-white border border-darkerGray hover:opacity-90"
          onClick={handleUnfollow}
        >
          Unfollow
        </button>
      );
    } else {
      return (
        <button
          className="bg-snow text-lg font-semibold rounded-full px-4 py-1 text-black border border-snow hover:opacity-90"
          onClick={handleFollow}
        >
          Follow
        </button>
      );
    }
  }

  return (
    <div className="flex flex-col gap-2 justify-center p-4 border-b border-darkerGray">
      <div className="relative flex items-center justify-end gap-4">
        <div className="mb-3 absolute bottom-0 left-0 w-24 h-24 aspect-square">
          <img
            src={profilePageUser.profileImg || defaultProfileImg}
            alt={profilePageUser.firstName}
            className="bg-white border-4 border-black rounded-full w-full h-full aspect-square object-cover"
          />
        </div>
        {renderCTAButton()}
      </div>
      <div className="font-inter">
        <h2 className="text-2xl font-semibold">
          {profilePageUser.firstName} {profilePageUser.lastName}
        </h2>
        <p className="text-gray">@{profilePageUser.username}</p>
        {profilePageUser.profileBio && (
          <p className="text-gray mt-2">{profilePageUser.profileBio}</p>
        )}
        {profilePageUser.profileURL && (
          <p className="flex items-center gap-1 mt-2">
            <UrlIcon />{" "}
            <a
              href={profilePageUser.profileURL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {profilePageUser.profileURL}
            </a>
          </p>
        )}
      </div>
      <div className="text-sm flex gap-2">
        <p>
          {profilePageUser.following.length}{" "}
          <span className="text-darkGray">Following</span>
        </p>
        <p>
          {profilePageUser.followers.length}{" "}
          <span className="text-darkGray">Followers</span>
        </p>
      </div>

      {editProfileModal && (
        <EditProfileModal onClose={() => setEditProfileModal(false)} />
      )}
    </div>
  );
}

export default UserHeader;
