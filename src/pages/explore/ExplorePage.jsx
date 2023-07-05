import { useSelector } from "react-redux";
import PostCard from "../../components/post/PostCard";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import PostSkeleton from "../../components/post/PostSkeleton";
import FlipMove from "react-flip-move";
import ProfileImage from "../../components/ProfileImage";
import { useNavigate } from "react-router";
import SearchWidget from "../../components/widgets/search/SearchWidget";
import { SettingsIcon } from "../../assets/icons";
import ThemeOptions from "../../components/theme/ThemeOptions";
import { useRef, useState } from "react";
import useClickOutside from "../../hooks/useClickOutside";

function ExplorePage() {
  useDocumentTitle("Explore | Twitify");
  const { allPosts, initialLoading } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [isThemeMenuOpen, setIsThemeMenuOpen] = useState(false);
  const setThemeMenuRef = useRef();
  useClickOutside(setThemeMenuRef, () => {
    setIsThemeMenuOpen(false);
  });

  function handleThemeBtnClick(event) {
    event.stopPropagation();
    setIsThemeMenuOpen(!isThemeMenuOpen);
  }

  const sortedPostsByDate = [...allPosts].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA; // Sort in descending order (newest to oldest)
  });

  const sortedPostsMapped = initialLoading ? (
    <div className="flex justify-center p-4">
      <PostSkeleton />
    </div>
  ) : sortedPostsByDate?.length ? (
    <FlipMove>
      {sortedPostsByDate.map((post) => (
        <PostCard postData={post} key={post._id} />
      ))}
    </FlipMove>
  ) : (
    <p className="text-center p-4 font-semibold">No posts here!</p>
  );

  return (
    <div className="mb-[64px] sm:mb-4">
      <div className="lg:hidden flex items-center gap-3 bg-white dark:bg-black font-inter px-4 py-3 border-b border-solid border-darkGray dark:border-darkerGray text-sm">
        <div
          onClick={() => navigate(`/profile/${user.username}`)}
          className="cursor-pointer"
        >
          <ProfileImage
            userImage={user.profileImg}
            userFirstName={user.firstName}
          />
        </div>
        <SearchWidget />
        <div className="relative">
          <button
            className="relative p-2 rounded-full hover:bg-transparentBlack2 dark:hover:bg-transparentWhite"
            onClick={handleThemeBtnClick}
            ref={setThemeMenuRef}
          >
            <SettingsIcon />
          </button>

          {isThemeMenuOpen && (
            <div className="bg-white dark:bg-black absolute top-full right-0 w-32 border border-solid border-darkGray dark:border-darkerGray z-10 rounded-lg overflow-hidden text-sm">
              <ThemeOptions />
            </div>
          )}
        </div>
      </div>
      <div className="bg-white dark:bg-black font-inter px-4 py-3 border-b border-solid border-darkGray dark:border-darkerGray text-xl font-bold">
        <h1>Explore</h1>
      </div>
      {sortedPostsMapped}
    </div>
  );
}

export default ExplorePage;
