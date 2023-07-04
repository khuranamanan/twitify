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
import MockmanPage from "../pages/MockmanPage";
import LoginPage from "../pages/auth/LoginPage";
import PrivateRoute from "../components/PrivateRoute";
import SignUpPage from "../pages/auth/SignUpPage";
import PageNotFound from "../pages/PageNotFound";
import ProfileError from "../pages/profile/components/ProfileError";

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/mockman" element={<MockmanPage />} />
      <Route
        path="/"
        element={
          <PrivateRoute>
            <RootLayout />
          </PrivateRoute>
        }
      >
        <Route index element={<HomePage />} />
        <Route path="explore" element={<ExplorePage />} />
        <Route path="bookmarks" element={<BookmarksPage />} />
        <Route
          path="profile/:username"
          element={<ProfilePage />}
          errorElement={<ProfileError />}
        />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);

export default routes;
