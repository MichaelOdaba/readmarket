import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Register from "../pages/Register";
import Todo from "../pages/Todo";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <div>Not found</div>,
    children: [
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/todo",
        element: <Todo />,
      },
    ],
  },
]);
export default router;
