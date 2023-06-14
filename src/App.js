import { RouterProvider } from "react-router";
import routes from "./routes/routes";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUsers } from "./redux/slices/allUsersSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <div className="bg-black h-screen w-screen text-white">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
