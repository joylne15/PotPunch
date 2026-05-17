import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [role,     setRole]  = useState("admin");
  const [email,    setEmail] = useState("");
  const [password, setPass]  = useState("");
  const [error,    setError] = useState("");
  const navigate             = useNavigate();

  function handleLogin() {
    setError("");
    if (!email || !password) {
      setError("Please enter your email and password");
      return;
    }

    // Temporary login — will be replaced by FastAPI later
    // Accept any email/password for testing
    if (role === "admin") {
      localStorage.setItem("role", "admin");
      localStorage.setItem("name", "Admin");
      navigate("/admin");
    } else if (role === "member") {
      localStorage.setItem("role", "member");
      localStorage.setItem("name", email || "Member");
      navigate("/member");
    }
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: "#F0F4F8" }}
    >
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-md overflow-hidden">

        {/* Header */}
        <div
          className="text-white text-center py-8 px-6"
          style={{ background: "linear-gradient(135deg, #1D9E75 0%, #0F6E56 100%)" }}
        >
          <div className="text-4xl mb-3">💰</div>
          <h1 className="text-2xl font-bold mb-1">Money Collection System</h1>
          <p className="text-sm opacity-80">Sign in to your account</p>
        </div>

        <div className="p-6">

          {/* Role selector */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button
              onClick={() => { setRole("admin"); setError(""); }}
              className={`border rounded-xl py-4 text-sm font-medium transition-all ${
                role === "admin"
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              <div className="text-2xl mb-1">🛡️</div>
              <div>Admin</div>
              <div className="text-xs font-normal opacity-60 mt-0.5">Full access</div>
            </button>
            <button
              onClick={() => { setRole("member"); setError(""); }}
              className={`border rounded-xl py-4 text-sm font-medium transition-all ${
                role === "member"
                  ? "border-green-500 bg-green-50 text-green-700"
                  : "border-gray-200 text-gray-500 hover:bg-gray-50"
              }`}
            >
              <div className="text-2xl mb-1">👤</div>
              <div>Member</div>
              <div className="text-xs font-normal opacity-60 mt-0.5">My contributions</div>
            </button>
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder={role === "admin" ? "admin" : "member"}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
            />
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-xs font-medium text-gray-500 uppercase tracking-wide mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPass(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder=""
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl text-xs text-red-600 text-center">
              ⚠️ {error}
            </div>
          )}

          {/* Login button */}
          <button
            onClick={handleLogin}
            className="w-full text-white rounded-xl py-3 text-sm font-semibold transition-all mb-4"
            style={{ background: "#1D9E75" }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#0F6E56")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#1D9E75")}
          >
            Sign In →
          </button>
            </div>
          </div>

        </div>
      
  
  );
}