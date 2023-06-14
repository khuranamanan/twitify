import defaultProfileImg from "../assets/defaultProfileImg.png";

function ProfileImage({ userImage, userFirstName, height = 10, width = 10 }) {
  return (
    <div
      className={`bg-snow w-${width} h-${height} aspect-square rounded-full border border-solid border-white`}
    >
      <img src={userImage || defaultProfileImg} alt={userFirstName} />
    </div>
  );
}

export default ProfileImage;
