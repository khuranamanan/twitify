import { useSelector } from "react-redux";
import FollowSuggestionCard from "./FollowSuggestionCard";

function WhoToFollow() {
  const { allUsers } = useSelector((state) => state.allUsers);
  const { user } = useSelector((state) => state.auth);

  const followSuggestionList = allUsers
    .filter((twitifyUser) => twitifyUser.username !== user.username)
    .reduce(
      (result, suggestedUser) =>
        user.following.some((following) => following._id === suggestedUser._id)
          ? result
          : [...result, suggestedUser],
      []
    );

  return (
    <div className="py-4 bg-transparentWhite max-h-[50%] rounded-3xl overflow-y-scroll no-scrollbar">
      <h2 className="text-white px-4 font-bold text-xl mb-4">Who to Follow</h2>
      {followSuggestionList.map((twitifyUser) => (
        <FollowSuggestionCard twitifyUser={twitifyUser} key={twitifyUser.id} />
      ))}
    </div>
  );
}

export default WhoToFollow;