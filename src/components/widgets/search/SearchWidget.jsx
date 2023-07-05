import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { SearchOutlinedIcon } from "../../../assets/icons";
import ProfileImage from "../../ProfileImage";
import { useRef } from "react";
import useClickOutside from "../../../hooks/useClickOutside";

function SearchWidget() {
  const { allUsers } = useSelector((state) => state.allUsers);
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const searchResultRef = useRef();
  useClickOutside(searchResultRef, () => setSearchTerm(""));

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const handleNavigate = (username) => {
    navigate(`/profile/${username}`);
    setSearchTerm("");
  };

  const getFilteredUsers = (allUsers, searchTerm) => {
    return allUsers.filter(
      (user) =>
        user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredUsers = getFilteredUsers(allUsers, searchTerm);

  return (
    <div className="relative w-full">
      <div className="px-4 py-2 flex items-center gap-4 bg-transparentBlack2 dark:bg-transparentWhite rounded-full shadow-md">
        <div className="text-darkGray">
          <SearchOutlinedIcon />
        </div>
        <input
          className="w-full bg-transparent border-none focus:outline-none"
          type="text"
          placeholder="Search Twitify Users"
          value={searchTerm}
          onChange={handleInputChange}
        />
      </div>
      {searchTerm.length > 0 && (
        <div
          className="absolute top-full left-0 cursor-pointer right-0 bg-white dark:bg-black rounded-2xl shadow-md pb-1 overflow-hidden max-h-56 overflow-y-scroll no-scrollbar z-10 border border-darkGray dark:border-darkerGray"
          ref={searchResultRef}
        >
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <div
                key={user?._id}
                className="p-2 flex items-center gap-2 border-b border-darkGray dark:border-darkerGray hover:bg-transparentBlack2 dark:hover:bg-transparentWhite2"
                onClick={() => {
                  handleNavigate(user?.username);
                }}
              >
                {user.profileImg && (
                  <ProfileImage
                    userImage={user?.profileImg}
                    userFirstName={user.firstName}
                  />
                )}
                <div>
                  <p className="font-medium">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-darkerGray dark:text-darkGray">
                    @{user?.username}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="p-2">
              <p className="font-medium text-xl flex justify-center">
                User not found
              </p>
            </div>
          )}
          <div className="p-2 flex justify-end">
            <button
              className="rounded-full bg-black text-snow dark:bg-snow dark:text-black hover:opacity-90 px-2 py-1 font-semibold"
              onClick={clearSearch}
            >
              Clear Search
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SearchWidget;
