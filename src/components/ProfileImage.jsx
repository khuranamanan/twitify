import defaultProfileImg from "../assets/defaultProfileImg.png";

function ProfileImage({ userImage, userFirstName }) {
  return (
    <div className="bg-snow w-10 h-10 aspect-square rounded-full border border-solid border-white">
      <img src={userImage || defaultProfileImg} alt={userFirstName} />
    </div>
  );
}

export default ProfileImage;
