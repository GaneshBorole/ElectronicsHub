import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load saved user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  // Signup: save user credentials
  const signup = async ({ name, email, password }) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");

    // check if email already exists
    if (users.find((u) => u.email === email)) {
      throw new Error("User already exists. Please login.");
    }

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
  };

  // Login: verify credentials
  const login = async ({ email, password }) => {
    const users = JSON.parse(localStorage.getItem("users") || "[]");
    const existing = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!existing) {
      throw new Error("User doesn't exist. Please sign up first.");
    }

    localStorage.setItem("user", JSON.stringify(existing));
    setUser(existing);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    alert("Logout successfully ✅");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
