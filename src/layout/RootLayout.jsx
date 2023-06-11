import { Outlet } from "react-router";
import SideNavBar from "../components/sideNavBar/SideNavBar";
import Widgets from "../components/widgets/Widgets";

function RootLayout() {
  return (
    <div className="relative max-w-screen-xl mx-auto p-2 h-full grid gap-4 md:grid-cols-[auto_minmax(200px,_1fr)_auto]">
      <header className="absolute bottom-0 left-0 right-0 border-solid border-t border-darkGray md:border-none md:static ">
        <SideNavBar />
      </header>

      <main>
        <Outlet />
      </main>

      <aside className="hidden lg:block">
        <Widgets />
      </aside>
    </div>
  );
}

export default RootLayout;
