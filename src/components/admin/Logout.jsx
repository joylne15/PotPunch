import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();
    function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }
    return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
    >
      Logout
    </button>
  );
}