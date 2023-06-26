import { useParams } from "react-router";
import useDocumentTitle from "../../hooks/useDocumentTitle";

function ProfilePage() {
  const { username } = useParams();
  useDocumentTitle(`@${username} | Twitify`);

  return <div>ProfilePage - {username}</div>;
}

export default ProfilePage;
