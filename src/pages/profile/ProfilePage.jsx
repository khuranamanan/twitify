import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useEffect } from "react";
import {
  followAUser,
  getProfilePageUser,
  unfollowAUser,
} from "../../redux/slices/allUsersSlice";
import { getProfilePageUserPosts } from "../../redux/slices/postsSlice";
import { BeatLoader } from "react-spinners";
import defaultCoverImg from "../../assets/defaultCoverImg.jpg";
import defaultProfileImg from "../../assets/defaultProfileImg.png";
import { ArrowLeftIcon, UrlIcon } from "../../assets/icons";
import PostSkeleton from "../../components/post/PostSkeleton";
import PostCard from "../../components/post/PostCard";
import FlipMove from "react-flip-move";

function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, token } = useSelector((state) => state.auth);
  const { profilePageUser, profilePageUserStatus, allUsers } = useSelector(
    (state) => state.allUsers
  );
  const { profilePageUserPosts, profilePageUserPostsStatus, allPosts } =
    useSelector((state) => state.posts);

  useDocumentTitle(`@${username} | Twitify`);

  const isThisUsersProfilePage = user.username === username;
  const isUserFollowingThisUser = user?.following.some(
    (twitifyUser) => twitifyUser.username === profilePageUser?.username
  );

  useEffect(() => {
    dispatch(getProfilePageUser(username));
  }, [username, dispatch, allUsers]);

  useEffect(() => {
    dispatch(getProfilePageUserPosts(username));
  }, [username, dispatch, allPosts]);

  function handleFollow() {
    dispatch(followAUser({ followUserID: profilePageUser._id, token: token }));
  }

  function handleUnfollow() {
    dispatch(
      unfollowAUser({ followUserID: profilePageUser._id, token: token })
    );
  }

  function renderCTAButton() {
    if (isThisUsersProfilePage) {
      return (
        <button className="text-lg font-semibold rounded-full px-4 py-1 text-white border border-darkerGray hover:opacity-90">
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

  function renderLoader() {
    return (
      <div className="flex justify-center items-center border-b border-darkerGray p-4 h-[60vh]">
        <BeatLoader color="#3fc1c9" />
      </div>
    );
  }

  function renderUserDetails() {
    return (
      <div className="flex flex-col gap-2 justify-center p-4 border-b border-darkerGray">
        <div className="relative flex items-center justify-end gap-4">
          <div className="mb-3 absolute bottom-0 left-0 w-24 h-24">
            <img
              src={profilePageUser.profileImg || defaultProfileImg}
              alt={profilePageUser.firstName}
              className="bg-white border-4 border-black rounded-full object-cover"
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
      </div>
    );
  }

  function renderPosts() {
    if (profilePageUserPostsStatus === "pending") {
      return <PostSkeleton />;
    }
    if (profilePageUserPosts.length === 0) {
      return <p className="text-center p-4 font-semibold">No posts</p>;
    }
    if (profilePageUserPosts.length !== 0) {
      return (
        <FlipMove>
          {[...profilePageUserPosts]
            .sort((a, b) => {
              const dateA = new Date(a.createdAt);
              const dateB = new Date(b.createdAt);
              return dateB - dateA; // Sort in descending order (newest to oldest)
            })
            .map((post) => (
              <PostCard postData={post} key={post._id} />
            ))}
        </FlipMove>
      );
    }
  }

  return (
    <div className="mb-[64px] sm:mb-4">
      {/* Top Column Heading */}
      <div className="bg-black flex items-center gap-4 font-inter px-4 py-3 border-b border-solid border-darkerGray text-xl font-semibold">
        <button
          className="cursor-pointer text-base pr-2 border-r border-darkerGray"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon />
        </button>
        <h1>{`@${username}`}</h1>
      </div>

      {/* Loader */}
      {profilePageUserStatus === "pending" &&
        profilePageUser?.username !== username &&
        renderLoader()}

      {/* Main */}
      {profilePageUser?.username === username && (
        <div>
          {/* Cover */}
          <div className="h-32 object-cover overflow-hidden sm:h-48">
            <img
              src={defaultCoverImg}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* ProfilePageUser Details */}
          {renderUserDetails()}
        </div>
      )}

      {/* In case of Error */}
      {(profilePageUserStatus === "rejected" ||
        profilePageUserPostsStatus === "rejected") && (
        <p className="text-center p-4 font-semibold">
          Failed to Load. Try Again.
        </p>
      )}

      {/* User Posts */}
      {renderPosts()}
    </div>
  );
}

export default ProfilePage;
