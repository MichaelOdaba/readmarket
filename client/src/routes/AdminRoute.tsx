import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { UserState } from "../store/slice/userSlice";

interface AdminRouteProps {
  element: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ element }) => {
  const user = useSelector((state: { user: UserState }) => state.user);

  if (!user?._id) {
    return <Navigate to="/app/login" replace />;
  }

  if (user.role !== "admin") {
    return <Navigate to="/app/dashboard" replace />;
  }

  return element;
};

export default AdminRoute;
