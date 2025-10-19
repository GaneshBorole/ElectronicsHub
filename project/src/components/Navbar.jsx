import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiShoppingCart, FiHome, FiClock, FiUser, FiLogOut } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex items-center justify-between">
        <Link to="/" className="text-xl font-bold flex items-center gap-2">
          ⚡ElectronicsHub
        </Link>

        <div className="hidden md:flex gap-6 items-center">
          <Link to="/" className="flex items-center gap-1.5"><FiHome /> Home</Link>
          <Link to="/shop" className="flex items-center gap-1.5">Shop</Link>
          <Link to="/cart" className="flex items-center gap-1.5"><FiShoppingCart /> Cart</Link>
          <Link to="/history" className="flex items-center gap-1.5"><FiClock /> History</Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <span className="hidden sm:block">Hi, {user.name}</span>
              <button onClick={handleLogout} className="flex items-center gap-1">
                <FiLogOut /> Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="flex items-center gap-1"><FiUser /> Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
}
