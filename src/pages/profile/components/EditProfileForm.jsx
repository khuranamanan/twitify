import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AVATAR_OPTIONS, COVER_OPTIONS } from "../../../utils/constant";
import { editUserProfile } from "../../../redux/slices/allUsersSlice";

function EditProfileForm({ onClose }) {
  const { user, token } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({
    firstName: user.firstName || "",
    lastName: user.lastName || "",
    profileImg: user.profileImg || "",
    coverImg: user.coverImg || "",
    profileBio: user.profileBio || "",
    profileURL: user.profileURL || "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();

  function handleAvatarChange(avatar) {
    setFormData({ ...formData, profileImg: avatar });
  }

  function handleCoverChange(cover) {
    setFormData({ ...formData, coverImg: cover });
  }

  function handleChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    const trimmedFirstName = formData.firstName.trim();
    const trimmedLastName = formData.lastName.trim();

    if (trimmedFirstName === "" || trimmedLastName === "") {
      setError("First name and last name are required.");
      return;
    }
    setError("");
    dispatch(editUserProfile({ userData: { ...formData }, token }));
    onClose();
  }

  return (
    <div className="flex flex-col items-center p-3 gap-2 text-sm md:text-base max-h-[90dvh] overflow-y-auto no-scrollbar">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="w-full flex flex-col gap-3">
        <div className="flex justify-between items-center gap-3">
          <label htmlFor="firstName" className="font-medium mb-2">
            First Name:
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="text-black border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex justify-between items-center gap-3">
          <label htmlFor="lastName" className="font-medium mb-2">
            Last Name:
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="text-black border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="flex justify-between items-center gap-3">
          <label className="font-medium mb-2">Profile Image:</label>
          <div className="flex items-center gap-2">
            {AVATAR_OPTIONS.map((avatar, index) => (
              <div
                key={index}
                className={`w-12 h-12 rounded-full overflow-hidden ${
                  formData.profileImg === avatar ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <img
                  src={avatar}
                  alt={`Avatar ${index}`}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => handleAvatarChange(avatar)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center gap-3 w-full">
          <label className="font-medium mb-2">Cover Image:</label>
          <div className="flex items-center flex-wrap gap-2 justify-end">
            {COVER_OPTIONS.map((cover, index) => (
              <div
                key={index}
                className={`w-24 aspect-video rounded-md overflow-hidden ${
                  formData.coverImg === cover ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <img
                  src={cover}
                  alt={`Cover ${index}`}
                  className="w-full h-full object-cover"
                  onClick={() => handleCoverChange(cover)}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center gap-3">
          <label htmlFor="bio" className="font-medium mb-2">
            Bio:
          </label>
          <textarea
            id="bio"
            name="profileBio"
            value={formData.profileBio}
            onChange={handleChange}
            className="text-black w-[50%] h-24 border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-between items-center gap-3">
          <label htmlFor="url" className="font-medium mb-2">
            Profile URL:
          </label>
          <input
            type="url"
            id="url"
            name="profileURL"
            value={formData.profileURL}
            onChange={handleChange}
            className="text-black border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => onClose()}
            className="bg-red-600 hover:bg-red-400 grow text-white font-medium py-2 px-4 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 grow text-white font-medium py-2 px-4 rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfileForm;
