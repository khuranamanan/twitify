import { RouterProvider } from "react-router";
import routes from "./routes/routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "./redux/slices/allUsersSlice";
import { getAllPosts } from "./redux/slices/postsSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <div className="bg-black h-dvh-screen w-screen text-white">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
