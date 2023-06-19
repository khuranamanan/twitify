import { useSelector } from "react-redux";
import PostCard from "../../components/post/PostCard";
import { Fragment } from "react";

function ExplorePage() {
  const { allPosts } = useSelector((state) => state.posts);

  return (
    <div className="mb-[64px] sm:mb-4">
      <div className="bg-black px-4 py-3 border-b border-solid border-darkerGray text-3xl font-bold">
        <h1>Explore</h1>
      </div>
      {allPosts.map((post) => (
        <Fragment key={post._id}>
          <PostCard postData={post} />
        </Fragment>
      ))}
    </div>
  );
}

export default ExplorePage;
