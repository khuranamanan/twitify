import { useSelector } from "react-redux";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import PostCard from "../../components/post/PostCard";
import FlipMove from "react-flip-move";

function BookmarksPage() {
  useDocumentTitle("Bookmarks | Twitify");
  const { user } = useSelector((state) => state.auth);
  const { allPosts } = useSelector((state) => state.posts);

  const bookmarkPostsList = allPosts.filter((post) =>
    user.bookmarks.some((bookmarkPostID) => bookmarkPostID === post._id)
  );

  const sortedPostsByDate = [...bookmarkPostsList].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA; // Sort in descending order (newest to oldest)
  });

  const bookmarksMapped = user.bookmarks.length ? (
    <div>
      <FlipMove>
        {sortedPostsByDate.map((post) => (
          <PostCard postData={post} key={post._id} />
        ))}
      </FlipMove>
    </div>
  ) : (
    <p className="text-center p-4 font-semibold">
      Welcome to your Bookmarks page! Start saving your favorite posts and build
      your own curated library. Happy exploring!
    </p>
  );

  return (
    <div className="mb-[64px] sm:mb-4">
      <div className="bg-black font-inter px-4 py-3 border-b border-solid border-darkerGray text-xl font-bold">
        <h1>Bookmarks</h1>
      </div>
      {bookmarksMapped}
    </div>
  );
}

export default BookmarksPage;
