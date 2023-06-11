import { Outlet } from "react-router";
import SideNavBar from "../components/sideNavBar/SideNavBar";
import Widgets from "../components/widgets/Widgets";

function RootLayout() {
  return (
    <div className="relative max-w-screen-xl mx-auto h-full grid gap-4 sm:grid-cols-[auto_minmax(200px,_1fr)_auto]">
      <header className="  absolute bottom-0 left-0 right-0 border-solid border-t border-darkerGray sm:h-full sm:overflow-y-scroll sm:border-r sm:border-t-0 sm:static no-scrollbar">
        <SideNavBar />
      </header>

      <main className="h-full overflow-y-scroll no-scrollbar">
        <Outlet />
      </main>

      <aside className="hidden h-full lg:block">
        <Widgets />
      </aside>
    </div>
  );
}

export default RootLayout;
