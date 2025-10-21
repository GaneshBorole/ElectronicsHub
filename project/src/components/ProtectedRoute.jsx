import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user } = useAuth();

  if (!user) {
    alert("User doesn't exist. Please sign up first.");
    return <Navigate to="/signup" replace />;
  }

  return children;
}
