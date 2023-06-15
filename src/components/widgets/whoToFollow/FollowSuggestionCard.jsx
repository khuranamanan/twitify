import { useNavigate } from "react-router";
import ProfileImage from "../../ProfileImage";
import { useDispatch, useSelector } from "react-redux";
import { followAUser } from "../../../redux/slices/allUsersSlice";

function FollowSuggestionCard({ twitifyUser }) {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleFollowBtnClick(event) {
    event.stopPropagation();
    dispatch(followAUser({ followUserID: twitifyUser._id, token: token }));
  }

  return (
    <div
      className="flex items-center justify-between gap-3 px-4 py-2 hover:bg-transparentWhite2 lg:w-full lg:mt-auto cursor-pointer transition-all ease-in-out duration-200"
      onClick={() => navigate(`/profile/${twitifyUser.username}`)}
    >
      <ProfileImage
        userImage={twitifyUser.profileImg}
        userFirstName={twitifyUser.firstName}
      />

      <div className="grow">
        <p className="font-semibold overflow-ellipsis">{`${twitifyUser.firstName} ${twitifyUser.lastName}`}</p>
        <p className="text-xs text-darkGray">{`@${twitifyUser.username}`}</p>
      </div>

      <button
        className="bg-snow font-semibold rounded-full px-4 py-1 text-black hover:opacity-90"
        onClick={handleFollowBtnClick}
      >
        Follow
      </button>
    </div>
  );
}

export default FollowSuggestionCard;
