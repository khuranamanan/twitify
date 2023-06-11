import { RouterProvider } from "react-router";
import routes from "./routes/routes";

function App() {
  return (
    <div className="bg-black h-screen w-screen text-white">
      <RouterProvider router={routes} />
    </div>
  );
}

export default App;
