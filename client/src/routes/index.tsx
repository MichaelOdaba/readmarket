import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Todo from "../pages/Todo";
import Login from "../pages/Login";
import SearchPage from "../pages/SearchPage";
import Home from "../pages/Home";
import DashBoard from "../pages/DashBoard";
import Library from "../pages/Library";
import Upload from "../pages/Upload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Not found</div>,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/search",
        element: <SearchPage />,
      },

      {
        path: "/todo",
        element: <Todo />,
      },
      {
        path: "dashboard",
        element: <DashBoard />,
        children: [
          {
            path: "/dashboard/library",
            element: <Library />,
          },
          {
            path: "/dashboard/upload",
            element: <Upload />,
          },
        ],
      },
    ],
  },
]);
export default router;
