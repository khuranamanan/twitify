import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import HomePage from "../pages/home/HomePage";
import RootLayout from "../layout/RootLayout";
import ExplorePage from "../pages/explore/ExplorePage";
import BookmarksPage from "../pages/bookmarks/BookmarksPage";
import ProfilePage from "../pages/profile/ProfilePage";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />}>
      <Route index element={<HomePage />} />
      <Route path="explore" element={<ExplorePage />} />
      <Route path="bookmarks" element={<BookmarksPage />} />
      <Route path="profile" element={<ProfilePage />} />
    </Route>
  )
);

export default routes;
