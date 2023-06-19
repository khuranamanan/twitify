import { TwitifyLogoIconSmall } from "../../assets/icons";
import CreateEditPost from "../../components/post/CreateEditPost";

function HomePage() {
  return (
    <div className="mb-[64px] sm:mb-4">
      <div className="sm:hidden bg-black px-4 pt-4 pb-5 flex justify-center border-b border-solid border-darkerGray h-fit">
        <TwitifyLogoIconSmall />
      </div>
      <CreateEditPost />
    </div>
  );
}

export default HomePage;
