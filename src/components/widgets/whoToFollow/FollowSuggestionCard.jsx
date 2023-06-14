import { useNavigate } from "react-router";
import ProfileImage from "../../ProfileImage";

function FollowSuggestionCard({ twitifyUser }) {
  const navigate = useNavigate();

  function handleFollowBtnClick(event) {
    event.stopPropagation();
  }

  return (
    // <div>
    //   {twitifyUser.firstName} {twitifyUser.lastName}
    // </div>
    <div
      className="flex items-center justify-between gap-3 px-4 py-2 hover:bg-transparentWhite2 lg:w-full lg:mt-auto cursor-pointer"
      onClick={() => navigate(`/profile/${twitifyUser.username}`)}
    >
      <ProfileImage
        userImage={twitifyUser.profileImg}
        userFirstName={twitifyUser.firstName}
        height={10}
        width={10}
      />

      <div className="grow">
        <p className="font-semibold overflow-ellipsis">{`${twitifyUser.firstName} ${twitifyUser.lastName}`}</p>
        <p className="text-xs text-darkGray">{`@${twitifyUser.username}`}</p>
      </div>

      <button
        className="bg-snow font-semibold rounded-full px-4 py-1 text-black"
        onClick={handleFollowBtnClick}
      >
        Follow
      </button>
    </div>
  );
}

export default FollowSuggestionCard;
