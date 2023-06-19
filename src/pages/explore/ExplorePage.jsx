import { useSelector } from "react-redux";
import PostCard from "../../components/post/PostCard";
import { Fragment } from "react";

function ExplorePage() {
  const { allPosts } = useSelector((state) => state.posts);

  const sortedPostsByDate = [...allPosts].sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return dateB - dateA; // Sort in descending order (newest to oldest)
  });

  return (
    <div className="mb-[64px] sm:mb-4">
      <div className="bg-black px-4 py-3 border-b border-solid border-darkerGray text-3xl font-bold">
        <h1>Explore</h1>
      </div>
      {sortedPostsByDate.map((post) => (
        <Fragment key={post._id}>
          <PostCard postData={post} />
        </Fragment>
      ))}
    </div>
  );
}

export default ExplorePage;
