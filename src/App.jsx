import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Login from "./pages/Login";
import AdminDashboard from "./components/admin/DashboardHome";
import MemberDashboard from "./pages/MemberDashboard";

const TARGET = 130000;

function App() {
  const navigate = useNavigate();
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelected] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  // Check if user is logged in
  const isAuthenticated = localStorage.getItem("role");

  function addMember(name) {
    const exists = members.find(
      (m) => m.name.toLowerCase() === name.toLowerCase()
    );
    if (exists) return { error: "Member already exists!" };
    setMembers([
      ...members,
      { id: Date.now(), name, paid: 0, payments: [] },
    ]);
    return { success: true };
  }

  function recordPayment(memberId, amount) {
    setMembers(
      members.map((m) =>
        m.id !== memberId
          ? m
          : {
              ...m,
              paid: m.paid + amount,
              payments: [
                ...m.payments,
                { amount, date: new Date().toLocaleString() },
              ],
            }
      )
    );
  }

  function deleteMember(id) {
    setMembers(members.filter((m) => m.id !== id));
  }

  function viewHistory(member) {
    setSelected(member);
    setShowHistory(true);
  }

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  const totalCollected = members.reduce((s, m) => s + m.paid, 0);
  const totalRemaining = Math.max(0, members.length * TARGET - totalCollected);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route
        path="/admin"
        element={
          isAuthenticated === "admin" ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      
      <Route
        path="/member"
        element={
          isAuthenticated ? (
            <MemberDashboard onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
