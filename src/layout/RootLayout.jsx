import { Outlet, useLocation } from "react-router";
import SideNavBar from "../components/sideNavBar/SideNavBar";
import Widgets from "../components/widgets/Widgets";
import PostModal from "../components/post/PostModal";
import { useEffect } from "react";

function RootLayout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="relative max-w-screen-xl mx-auto h-full grid sm:grid-cols-[auto_minmax(200px,_1fr)_auto]">
      <PostModal />

      <header className="fixed bottom-0 left-0 right-0 z-30 border-solid border-t border-darkGray dark:border-darkerGray sm:sticky sm:top-0 sm:bottom-0 sm:h-screen sm:overflow-y-scroll sm:border-r sm:border-t-0 no-scrollbar">
        <SideNavBar />
      </header>

      <main className="h-full">
        <Outlet />
      </main>

      <aside className="hidden h-screen lg:block no-scrollbar sm:sticky sm:top-0 sm:bottom-0 sm:overflow-y-scroll">
        <Widgets />
      </aside>
    </div>
  );
}

export default RootLayout;
