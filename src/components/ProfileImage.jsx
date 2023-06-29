import defaultProfileImg from "../assets/defaultProfileImg.png";

function ProfileImage({ userImage, userFirstName }) {
  return (
    <div className="w-10 h-10 aspect-square rounded-full">
      <img
        src={userImage || defaultProfileImg}
        alt={userFirstName}
        className="bg-white rounded-full object-cover w-full h-full"
      />
    </div>
  );
}

export default ProfileImage;
