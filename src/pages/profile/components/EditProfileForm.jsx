import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AVATAR_OPTIONS, COVER_OPTIONS } from "../../../utils/constant";
import { editUserProfile } from "../../../redux/slices/allUsersSlice";
import defaultProfileImg from "../../../assets/defaultProfileImg.png";
import defaultCoverImg from "../../../assets/defaultCoverImg.jpg";
import { UploadIcon } from "../../../assets/icons";
import { toast } from "react-toastify";

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
  const [profileImageUploading, setProfileImageUploading] = useState(false);
  const [coverImageUploading, setCoverImageUploading] = useState(false);
  const dispatch = useDispatch();

  async function handleImageChange(event, imageType) {
    const image = event.target.files[0];
    if (!image) return;

    if (Math.round(image.size / 1024000) > 2) {
      toast.error("File size should be less than 2MB");
      return;
    }

    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", process.env.REACT_APP_CLOUDINARY_API_KEY);

    const requestOptions = {
      method: "POST",
      body: formData,
    };

    if (imageType === "profileImg") {
      setProfileImageUploading(true);
    } else if (imageType === "coverImg") {
      setCoverImageUploading(true);
    }

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dsuxc3pwu/image/upload",
        requestOptions
      );
      const data = await response.json();

      if (imageType === "profileImg") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          profileImg: data.secure_url || "",
        }));
      } else if (imageType === "coverImg") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          coverImg: data.secure_url || "",
        }));
      }

      toast.success("Image Uploaded");
    } catch (error) {
      console.error(error);
      toast.error("Image Uploading failed");
    } finally {
      if (imageType === "profileImg") {
        setProfileImageUploading(false);
      } else if (imageType === "coverImg") {
        setCoverImageUploading(false);
      }
    }
  }

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
    <div className="flex flex-col items-center p-3 gap-2 text-sm md:text-base max-h-[90vh] overflow-y-auto no-scrollbar">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {profileImageUploading && (
        <p className="text-cyan mb-4">Uploading Profile Image...</p>
      )}
      {coverImageUploading && (
        <p className="text-cyan mb-4">Uploading Cover Image...</p>
      )}
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
          <div className="flex items-center gap-2 flex-wrap justify-end">
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

            <div
              className={`relative w-12 h-12 rounded-full bg-snow ${
                formData.profileImg === user.profileImg
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
            >
              <img
                src={formData.profileImg || defaultProfileImg}
                alt="Profile"
                className="w-full h-full object-cover cursor-pointer rounded-full"
              />
              <label
                htmlFor="imgUpload"
                className="absolute inset-0 bg-transparentBlack flex justify-center items-center text-slate-300  bg-customBg text-deepBlue rounded-full p-1 cursor-pointer"
              >
                <UploadIcon />
                <input
                  type="file"
                  id="imgUpload"
                  className="input hidden disabled:opacity-50 rounded-full disabled:cursor-not-allowed"
                  accept="image/*"
                  disabled={coverImageUploading || profileImageUploading}
                  onChange={(e) => handleImageChange(e, "profileImg")}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center gap-3">
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

            <div
              className={`relative w-24 aspect-video rounded-md overflow-hidden bg-snow ${
                formData.coverImg === user.coverImg
                  ? "ring-2 ring-blue-500"
                  : ""
              }`}
            >
              <img
                src={formData.coverImg || defaultCoverImg}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <label
                htmlFor="coverImgUpload"
                className="absolute inset-0 bg-transparentBlack flex justify-center items-center text-slate-300 text-deepBlue p-1 cursor-pointer"
              >
                <UploadIcon />
                <input
                  type="file"
                  id="coverImgUpload"
                  className="input hidden disabled:opacity-50 disabled:cursor-not-allowed"
                  accept="image/*"
                  disabled={coverImageUploading || profileImageUploading}
                  onChange={(e) => handleImageChange(e, "coverImg")}
                />
              </label>
            </div>
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
            disabled={coverImageUploading || profileImageUploading}
            className="bg-red-600 hover:bg-red-400 disabled:opacity-50 disabled:cursor-not-allowed grow text-white font-medium py-2 px-4 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={coverImageUploading || profileImageUploading}
            className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed grow text-white font-medium py-2 px-4 rounded-md"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfileForm;
