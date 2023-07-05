import SearchWidget from "./search/SearchWidget";
import WhoToFollow from "./whoToFollow/WhoToFollow";

function Widgets() {
  return (
    <div className="dark:bg-black w-[24rem] p-4 border-l border-darkGray dark:border-darkerGray h-full flex flex-col gap-4">
      <SearchWidget />
      <WhoToFollow />
    </div>
  );
}

export default Widgets;
