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
import Profile from "../pages/Profile";
import CollectionPage from "../pages/CollectionPage";
import AddCollectionPage from "../pages/AddCollectionPage";

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
        path: "/collection/:id",
        element: <CollectionPage />,
      },
      {
        path: "/todo",
        element: <Todo />,
      },
      {
        path: "/dashboard",
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
          {
            path: "/dashboard/profile",
            element: <Profile />,
          },
          {
            path: "/dashboard/collection/add",
            element: <AddCollectionPage />,
          },
        ],
      },
    ],
  },
]);
export default router;
