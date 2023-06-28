import { RouterProvider } from "react-router";
import routes from "./routes/routes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "./redux/slices/allUsersSlice";
import { getAllPosts } from "./redux/slices/postsSlice";

function App() {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getAllUsers());
      dispatch(getAllPosts());
    }
  }, [dispatch, isLoggedIn]);

  return (
    <div className="bg-black h-dvh-screen text-white">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
