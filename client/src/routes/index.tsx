import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Todo from "../pages/Todo";
import Login from "../pages/Login";
import SearchPage from "../pages/SearchPage";
import Home from "../pages/Home";
import DashBoard from "../pages/DashBoard";
import Library from "../pages/Library";
import UploadPage from "../pages/UploadPage";
import Profile from "../pages/Profile";
import CollectionPage from "../pages/CollectionPage";
import AddCollectionPage from "../pages/AddCollectionPage";
import ProductDetail from "../pages/ProductDetail";
import CreateAdminPage from "../pages/CreateAdminPage";
import EditProduct from "../pages/EditProduct";
import ProtectedRoute from "./ProtectedRoute";
import LandingPage from "../pages/LandingPage";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/app",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/app",
        element: <Home />,
      },
      {
        path: "/app/register",
        element: <Register />,
      },
      {
        path: "/app/login",
        element: <Login />,
      },
      {
        path: "/app/search",
        element: <SearchPage />,
      },
      {
        path: "/app/collection/:id",
        element: <CollectionPage />,
      },
      {
        path: "/app/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/app/todo",
        element: <Todo />,
      },
      {
        path: "/app/dashboard",
        element: <DashBoard />,
        children: [
          {
            path: "/app/dashboard/library",
            element: <Library />,
          },
          {
            path: "/app/dashboard/upload",
            element: <UploadPage />,
          },
          {
            path: "/app/dashboard/product/:id/edit",
            element: <ProtectedRoute element={<EditProduct />} />,
          },
          {
            path: "/app/dashboard/profile",
            element: <Profile />,
          },
          {
            path: "/app/dashboard/collection/add",
            element: <AddCollectionPage />,
          },

          {
            path: "/app/dashboard/create-admin",
            element: <CreateAdminPage />,
          },
        ],
      },
    ],
  },
]);
export default router;
