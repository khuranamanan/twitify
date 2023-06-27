import { useRef, useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  SortIcon,
  TrendingIcon,
  TwitifyLogoIconSmall,
} from "../../assets/icons";
import CreateEditPost from "../../components/post/CreateEditPost";
import { SORT_TYPES } from "../../utils/constant";
import { useSelector } from "react-redux";
import PostCard from "../../components/post/PostCard";
import useClickOutside from "../../hooks/useClickOutside";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import PostSkeleton from "../../components/post/PostSkeleton";
import FlipMove from "react-flip-move";

function HomePage() {
  useDocumentTitle("Twitify");
  const { allPosts, initialLoading } = useSelector((state) => state.posts);
  const { user } = useSelector((state) => state.auth);
  const [sortType, setSortType] = useState(SORT_TYPES.LATEST);
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const sortMenuRef = useRef();
  useClickOutside(sortMenuRef, () => {
    setIsSortMenuOpen(false);
  });

  function handleSortBtnClick() {
    setIsSortMenuOpen(!isSortMenuOpen);
  }

  function handleSortSelectionClick(event) {
    event.stopPropagation();
    setSortType(event.target.getAttribute("data-value"));
  }

  const homePosts = allPosts?.filter(
    (post) =>
      post?.username === user?.username ||
      user?.following?.find(
        (followingUser) => followingUser?.username === post?.username
      )
  );

  let sortedPosts;
  if (sortType === SORT_TYPES.LATEST && homePosts.length) {
    sortedPosts = [...homePosts].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA; // Sort in descending order (newest to oldest)
    });
  } else if (sortType === SORT_TYPES.OLDEST && homePosts.length) {
    sortedPosts = [...homePosts].sort((a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateA - dateB; // Sort in Ascending order (oldest to Newest)
    });
  } else if (sortType === SORT_TYPES.TRENDING && homePosts.length) {
    sortedPosts = [...homePosts].sort((a, b) => {
      const countA = a.likes.likeCount;
      const countB = b.likes.likeCount;
      return countB - countA; // Sort in descending order (likes) (highest to lowest)
    });
  }

  const sortedPostsMapped = initialLoading ? (
    <div className="flex justify-center p-4">
      <PostSkeleton />
    </div>
  ) : sortedPosts?.length ? (
    <FlipMove>
      {sortedPosts.map((post) => (
        <PostCard postData={post} key={post._id} />
      ))}
    </FlipMove>
  ) : (
    <p className="text-center p-4 font-semibold">
      Follow users to see their posts here!
    </p>
  );

  return (
    <div className="mb-[64px] sm:mb-4">
      <div className="sm:hidden bg-black px-4 pt-4 pb-5 flex justify-center border-b border-solid border-darkerGray h-fit">
        <TwitifyLogoIconSmall />
      </div>
      <div className="bg-black font-inter hidden sm:block px-4 py-3 border-b border-solid border-darkerGray text-xl font-bold">
        <h1>Home</h1>
      </div>
      <CreateEditPost />

      {/* Sort Bar */}
      <div className="bg-black relative flex items-center justify-between font-inter px-4 py-3 border-b border-solid border-darkerGray text-lg font-bold">
        <h2>{sortType}</h2>

        <button
          className="relative p-2 rounded-full hover:text-aqua hover:bg-transparentWhite"
          onClick={handleSortBtnClick}
          ref={sortMenuRef}
        >
          <SortIcon />
        </button>

        {isSortMenuOpen && (
          <div className="bg-black absolute right-16 top-6 w-32 border border-solid border-darkerGray z-10 rounded-lg overflow-hidden text-sm">
            <div
              className={`py-2 px-3 flex items-center gap-1 cursor-pointer hover:bg-transparentWhite ${
                sortType === SORT_TYPES.TRENDING ? "text-aqua" : ""
              }`}
              data-value={SORT_TYPES.TRENDING}
              onClick={handleSortSelectionClick}
            >
              <TrendingIcon /> Trending
            </div>
            <div
              className={`py-2 px-3 flex items-center gap-1 cursor-pointer hover:bg-transparentWhite ${
                sortType === SORT_TYPES.LATEST ? "text-aqua" : ""
              }`}
              data-value={SORT_TYPES.LATEST}
              onClick={handleSortSelectionClick}
            >
              <ChevronUpIcon /> Latest
            </div>
            <div
              className={`py-2 px-3 flex items-center gap-1 cursor-pointer hover:bg-transparentWhite ${
                sortType === SORT_TYPES.OLDEST ? "text-aqua" : ""
              }`}
              data-value={SORT_TYPES.OLDEST}
              onClick={handleSortSelectionClick}
            >
              <ChevronDownIcon /> Oldest
            </div>
          </div>
        )}
      </div>

      {/* Posts */}
      <div>{sortedPostsMapped}</div>
    </div>
  );
}

export default HomePage;
