import { useSelector } from "react-redux";
import PostCard from "../../components/post/PostCard";

function ExplorePage() {
  const { allPosts } = useSelector((state) => state.posts);

  return (
    <div>
      <div className="bg-black px-4 py-3 border-b border-solid border-darkerGray text-3xl font-bold">
        <h1>Explore</h1>
      </div>
      {allPosts.map((post) => (
        <PostCard postData={post} />
      ))}
    </div>
  );
}

export default ExplorePage;
