import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateComponent = () => {
  const auth = localStorage.getItem("user");
  const role = localStorage.getItem("role");
  return role == "admin" ? <Outlet /> : <Navigate to="/signin"></Navigate>;
};

export default PrivateComponent;
