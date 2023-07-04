import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { useEffect } from "react";
import { getProfilePageUser } from "../../redux/slices/allUsersSlice";
import { getProfilePageUserPosts } from "../../redux/slices/postsSlice";
import { BeatLoader } from "react-spinners";
import defaultCoverImg from "../../assets/defaultCoverImg.jpg";
import { ArrowLeftIcon } from "../../assets/icons";
import PostSkeleton from "../../components/post/PostSkeleton";
import PostCard from "../../components/post/PostCard";
import FlipMove from "react-flip-move";
import UserHeader from "./UserHeader";

function ProfilePage() {
  const { username } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
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

  function renderLoader() {
    return (
      <div className="flex justify-center items-center border-b border-darkerGray p-4 h-[60vh]">
        <BeatLoader color="#3fc1c9" />
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

  if (
    profilePageUserStatus === "rejected" ||
    profilePageUserPostsStatus === "rejected"
  ) {
    throw new Error("An error occurred while fetching user data");
  }

  return (
    <div className="mb-[64px] sm:mb-4">
      {/* Top Column Heading */}
      <div className="bg-black flex items-center gap-4 font-inter px-2 py-3 border-b border-solid border-darkerGray text-xl font-semibold h-16">
        <button
          className="cursor-pointer text-sm p-2 rounded-full hover:bg-transparentWhite"
          onClick={() => navigate(-1)}
        >
          <ArrowLeftIcon />
        </button>

        {profilePageUser?.username === username && (
          <div>
            <h3 className="text-xl">{`${profilePageUser.firstName} ${profilePageUser.lastName}`}</h3>
            <p className="text-xs font-light tracking-wider text-darkGray">{`${
              profilePageUserPosts.length
            } Post${profilePageUserPosts.length > 1 ? "s" : ""}`}</p>
          </div>
        )}
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
              src={profilePageUser?.coverImg || defaultCoverImg}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          </div>

          {/* ProfilePageUser Details */}
          <UserHeader
            profilePageUser={profilePageUser}
            isThisUsersProfilePage={isThisUsersProfilePage}
            isUserFollowingThisUser={isUserFollowingThisUser}
          />
        </div>
      )}

      {/* User Posts */}
      {renderPosts()}
    </div>
  );
}

export default ProfilePage;
