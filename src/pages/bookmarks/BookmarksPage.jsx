import { useSelector } from "react-redux";
import useDocumentTitle from "../../hooks/useDocumentTitle";
import { Fragment } from "react";
import PostCard from "../../components/post/PostCard";

function BookmarksPage() {
  useDocumentTitle("Bookmarks | Twitify");
  const { user } = useSelector((state) => state.auth);
  const { allPosts } = useSelector((state) => state.posts);

  const bookmarkPostsList = allPosts.filter((post) =>
    user.bookmarks.some((bookmarkPost) => bookmarkPost._id === post._id)
  );

  const bookmarksMapped = user.bookmarks.length ? (
    <div>
      {bookmarkPostsList.map((post) => (
        <Fragment key={post._id}>
          <PostCard postData={post} />
        </Fragment>
      ))}
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
