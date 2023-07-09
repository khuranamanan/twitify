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
    followSuggestionList.length > 0 && (
      <div className="py-4 bg-transparentBlack2 dark:bg-transparentWhite max-h-[50%] rounded-3xl flex flex-col overflow-hidden">
        <h2 className="px-4 font-bold text-xl mb-4">Who to Follow</h2>
        <div className="flex flex-col gap-1 grow overflow-y-scroll no-scrollbar">
          {followSuggestionList.map((twitifyUser) => (
            <FollowSuggestionCard
              twitifyUser={twitifyUser}
              key={twitifyUser.id}
            />
          ))}
        </div>
      </div>
    )
  );
}

export default WhoToFollow;
