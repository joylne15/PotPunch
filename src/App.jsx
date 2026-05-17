import React, { useState } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import StartCard from "./components/StartCard";
import AddMemberForm from "./components/AddMemberForm";
import PaymentForm from "./components/PaymentForm";
import MemberTable from "./components/MemberTable";
import History from "./components/History";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
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
            <div className="min-h-screen" style={{ background: "#F0F4F8" }}>
              <div className="max-w-9xl mx-auto px-4 pt-4 pb-10 mt-6 space-y-6">
                <Header onLogout={handleLogout} />
                <StartCard
                  totalMembers={members.length}
                  totalCollected={totalCollected}
                  totalRemaining={totalRemaining}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <AddMemberForm onAdd={addMember} />
                  <PaymentForm
                    members={members}
                    target={TARGET}
                    onPayment={recordPayment}
                  />
                </div>
                <MemberTable
                  members={members}
                  target={TARGET}
                  onDelete={deleteMember}
                  onViewHistory={viewHistory}
                />
              </div>
              {showHistory && selectedMember && (
                <History
                  member={members.find((m) => m.id === selectedMember.id)}
                  target={TARGET}
                  onClose={() => setShowHistory(false)}
                />
              )}
            </div>
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