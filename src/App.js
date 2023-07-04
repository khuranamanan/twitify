import { RouterProvider } from "react-router";
import routes from "./routes/routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "./redux/slices/allUsersSlice";
import { getAllPosts } from "./redux/slices/postsSlice";
import { ToastContainer, Slide } from "react-toastify";
import { updateSystemTheme } from "./redux/slices/themeSlice";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const themeMode = useSelector((state) => state.theme.mode);
  const systemPreferenceSelected = useSelector(
    (state) => state.theme.systemPreferenceSelected
  );

  useEffect(() => {
    function checkSystemTheme() {
      if (systemPreferenceSelected) {
        dispatch(updateSystemTheme());
      }
    }

    const systemThemeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    systemThemeMediaQuery.addEventListener("change", checkSystemTheme);

    return () => {
      systemThemeMediaQuery.removeEventListener("change", checkSystemTheme);
    };
  }, [dispatch, systemPreferenceSelected]);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllUsers());
      dispatch(getAllPosts());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className={themeMode}>
      <div className="bg-white dark:bg-black dark:text-white h-dvh-screen text-black">
        <ToastContainer
          transition={Slide}
          position="top-center"
          autoClose={2000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme={themeMode}
        />
        <RouterProvider router={routes} />
      </div>
    </div>
  );
}

export default App;
