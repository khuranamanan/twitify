import { useParams } from "react-router";

function ProfilePage() {
  const { username } = useParams();

  return <div>ProfilePage - {username}</div>;
}

export default ProfilePage;
