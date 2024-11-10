import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import userDetailsStore from "../../Store/userDetailsStore";

function ProtectedRoutes() {
  const user = userDetailsStore((state) => state.user);

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
