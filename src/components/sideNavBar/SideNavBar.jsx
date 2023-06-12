import { NavLink } from "react-router-dom";
import {
  BookmarksIcon,
  ExploreIcon,
  HomeIcon,
  ProfileIcon,
  TwitIcon,
  TwitifyLogoIcon,
} from "../../assets/icons";

function SideNavBar() {
  function handleNavLinkStyle({ isActive }) {
    return `navlink  ${isActive ? "font-extrabold stroke-2" : "stroke-[1.5]"}`;
  }
  return (
    <div className="relative bg-black font-inter font-medium flex px-2 py-2 gap-10 items-center sm:px-3 sm:py-4 sm:flex-col lg:items-start sm:h-full">
      <div className="hidden px-3 sm:block">
        <TwitifyLogoIcon />
      </div>

      <nav className="text-xl flex gap-4 w-full justify-around items-center lg:w-[15rem] sm:justify-normal sm:flex-col lg:items-start">
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
        <NavLink to="profile" className={handleNavLinkStyle}>
          <ProfileIcon />
          <span className="hidden lg:block items-center">Profile</span>
        </NavLink>
      </nav>

      <button className="mb-4 flex gap-1 justify-center items-center absolute top-[-105%] right-2 btn uppercase font-bold bg-cyan lg:w-full sm:static hover:brightness-105">
        <TwitIcon />
        <span className="hidden lg:inline-block">Twit</span>
      </button>
    </div>
  );
}

export default SideNavBar;
