import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { UserState } from "../store/slice/userSlice";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const user = useSelector((state: { user: UserState }) => state?.user);

  if (!user?._id) {
    return <Navigate to="/login" replace />;
  }

  return element;
};

export default ProtectedRoute;
