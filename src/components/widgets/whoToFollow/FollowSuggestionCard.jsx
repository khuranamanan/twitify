import { useNavigate } from "react-router";
import ProfileImage from "../../ProfileImage";
import { useDispatch, useSelector } from "react-redux";
import { followAUser } from "../../../redux/slices/allUsersSlice";
import { debounce } from "../../../utils/debounce";

function FollowSuggestionCard({ twitifyUser }) {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleFollowBtnClick() {
    dispatch(followAUser({ followUserID: twitifyUser._id, token: token }));
  }

  const debouncedFollowAction = debounce(handleFollowBtnClick, 300);

  return (
    <div
      className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-transparentWhite2 lg:w-full lg:mt-auto cursor-pointer transition-all ease-in-out duration-150"
      onClick={() => navigate(`/profile/${twitifyUser.username}`)}
    >
      <ProfileImage
        userImage={twitifyUser.profileImg}
        userFirstName={twitifyUser.firstName}
      />

      <div className="grow">
        <p className="font-semibold overflow-ellipsis">{`${twitifyUser.firstName} ${twitifyUser.lastName}`}</p>
        <p className="text-xs text-darkerGray dark:text-darkGray">{`@${twitifyUser.username}`}</p>
      </div>

      <button
        className="bg-black dark:bg-snow font-semibold rounded-full px-4 py-1 text-snow dark:text-black hover:opacity-90"
        onClick={(event) => {
          event.stopPropagation();
          debouncedFollowAction();
        }}
      >
        Follow
      </button>
    </div>
  );
}

export default FollowSuggestionCard;
