import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    // redirect to login if not logged in
    return <Navigate to="/login" replace />;
  }

  // show the requested page if logged in
  return children;
};

export default ProtectedRoute;
