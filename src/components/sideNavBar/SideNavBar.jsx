import { NavLink, useNavigate } from "react-router-dom";
import {
  BookmarksIcon,
  ExploreIcon,
  HomeIcon,
  LogOutIcon,
  ProfileIcon,
  TwitIcon,
  TwitifyLogoIcon,
} from "../../assets/icons";
import { useDispatch, useSelector } from "react-redux";
import { handleLogOut } from "../../redux/slices/authSlice";
import ProfileImage from "../ProfileImage";

function SideNavBar() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleNavLinkStyle({ isActive }) {
    return `navlink  ${isActive ? "font-extrabold stroke-2" : "stroke-[1.5]"}`;
  }

  return (
    <div className="relative bg-black font-inter font-medium flex px-2 py-2 gap-10 items-center sm:px-3 sm:py-4 sm:flex-col lg:items-start sm:h-full lg:w-[16rem]">
      <div className="hidden px-3 sm:block">
        <TwitifyLogoIcon />
      </div>

      <nav className="text-xl flex gap-4 w-full justify-around items-center sm:justify-normal sm:flex-col lg:items-start">
        <NavLink to="/" className={handleNavLinkStyle}>
          <HomeIcon />
          <span className="hidden lg:block items-center">Home</span>
        </NavLink>
        <NavLink to="/explore" className={handleNavLinkStyle}>
          <ExploreIcon />
          <span className="hidden lg:block items-center">Explore</span>
        </NavLink>
        <NavLink to="/bookmarks" className={handleNavLinkStyle}>
          <BookmarksIcon />
          <span className="hidden lg:block items-center">Bookmarks</span>
        </NavLink>
        <NavLink
          to={`/profile/${user.username}`}
          className={handleNavLinkStyle}
        >
          <ProfileIcon />
          <span className="hidden lg:block items-center">Profile</span>
        </NavLink>
        <button className="navlink" onClick={() => dispatch(handleLogOut())}>
          <LogOutIcon />
          <span className="hidden lg:block items-center">Log Out</span>
        </button>
      </nav>

      <button className="mb-4 flex gap-1 justify-center items-center absolute top-[-105%] right-2 btn uppercase font-bold bg-cyan lg:w-full sm:static hover:brightness-105">
        <TwitIcon />
        <span className="hidden lg:inline-block">Twit</span>
      </button>

      <div
        className="hidden lg:flex gap-4 px-3 py-3 rounded-full hover:bg-transparentWhite lg:w-full lg:mt-auto cursor-pointer"
        onClick={() => navigate(`/profile/${user.username}`)}
      >
        <ProfileImage
          userImage={user.profileImg}
          userFirstName={user.firstName}
          height={10}
          width={10}
        />

        <div>
          <p>{`${user.firstName} ${user.lastName}`}</p>
          <p className="text-xs text-darkGray">{`@${user.username}`}</p>
        </div>
      </div>
    </div>
  );
}

export default SideNavBar;
