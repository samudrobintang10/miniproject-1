import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { useLocation, useNavigate } from "react-router";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");
  const path = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (path.pathname === "/login" && isAuthenticated) {
        navigate("/");
    }
  }, [path]);

  return (
    <AuthContext.Provider value={{ isAuthenticated, role }}>{children}</AuthContext.Provider>
  );
};
