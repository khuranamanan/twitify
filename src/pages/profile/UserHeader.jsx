import React from "react";
import { UrlIcon } from "../../assets/icons";
import defaultProfileImg from "../../assets/defaultProfileImg.png";
import { useDispatch, useSelector } from "react-redux";
import { followAUser, unfollowAUser } from "../../redux/slices/allUsersSlice";
import { useState } from "react";
import EditProfileModal from "./components/EditProfileModal";
import { debounce } from "../../utils/debounce";

function UserHeader({
  profilePageUser,
  isThisUsersProfilePage,
  isUserFollowingThisUser,
}) {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [editProfileModal, setEditProfileModal] = useState(false);

  const handleFollow = debounce(() => {
    dispatch(followAUser({ followUserID: profilePageUser._id, token: token }));
  }, 300);

  const handleUnfollow = debounce(() => {
    dispatch(
      unfollowAUser({ followUserID: profilePageUser._id, token: token })
    );
  }, 300);

  function handleEditProfileBtnClick() {
    setEditProfileModal(true);
  }

  function renderCTAButton() {
    if (isThisUsersProfilePage) {
      return (
        <button
          className="text-lg font-semibold rounded-full px-4 py-1 text-black dark:text-white border border-darkGray dark:border-darkerGray hover:opacity-90"
          onClick={handleEditProfileBtnClick}
        >
          Edit Profile
        </button>
      );
    } else if (isUserFollowingThisUser) {
      return (
        <button
          className="text-lg font-semibold rounded-full px-4 py-1 text-black dark:text-white border border-darkGray dark:border-darkerGray hover:opacity-90"
          onClick={handleUnfollow}
        >
          Unfollow
        </button>
      );
    } else {
      return (
        <button
          className="bg-black dark:bg-snow text-lg font-semibold rounded-full px-4 py-1 text-snow dark:text-black border border-black dark:border-snow hover:opacity-90"
          onClick={handleFollow}
        >
          Follow
        </button>
      );
    }
  }

  return (
    <div className="flex flex-col gap-2 justify-center p-4 border-b border-darkGray dark:border-darkerGray">
      <div className="relative flex items-center justify-end gap-4">
        <div className="mb-3 absolute bottom-0 left-0 w-24 h-24 aspect-square">
          <img
            src={profilePageUser.profileImg || defaultProfileImg}
            alt={profilePageUser.firstName}
            className="bg-white border-4 border-white dark:border-black rounded-full w-full h-full aspect-square object-cover"
          />
        </div>
        {renderCTAButton()}
      </div>
      <div className="font-inter">
        <h2 className="text-2xl font-semibold">
          {profilePageUser.firstName} {profilePageUser.lastName}
        </h2>
        <p className="text-darkerGray dark:text-gray">
          @{profilePageUser.username}
        </p>
        {profilePageUser.profileBio && (
          <p className="text-darkerGray dark:text-gray mt-2">
            {profilePageUser.profileBio}
          </p>
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
          <span className="text-darkerGray dark:text-gray">Following</span>
        </p>
        <p>
          {profilePageUser.followers.length}{" "}
          <span className="text-darkerGray dark:text-gray">Followers</span>
        </p>
      </div>

      {editProfileModal && (
        <EditProfileModal onClose={() => setEditProfileModal(false)} />
      )}
    </div>
  );
}

export default UserHeader;
