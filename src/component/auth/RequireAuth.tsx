"use strict"
import { Navigate, useLocation, Outlet } from "react-router-dom";
import React from "react";

// Check for a token in cookies (matches login logic)
function getCookie(name: string) {
  return document.cookie.split("; ").find((row) => row.startsWith(name + "="))?.split("=")[1];
}

function isAuthenticated() {
  return Boolean(getCookie("token"));
}

const RequireAuth: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  if (!isAuthenticated()) {
    // Redirect to login, or register if desired
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // If used as a wrapper route, render <Outlet />; otherwise, render children
  return children ? <>{children}</> : <Outlet />;
};

export default RequireAuth;
