import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import StartCard from "../components/StartCard";
import AddMemberForm from "../components/AddMemberForm";
import PaymentForm from "../components/PaymentForm";
import MemberTable from "../components/MemberTable";
import History from "../components/History";

const TARGET = 130000;

export default function AdminDashboard() {
  const navigate                      = useNavigate();
  const [members, setMembers]         = useState([]);
  const [selectedMember, setSelected] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

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
        m.id !== memberId ? m : {
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
    <div className="min-h-screen" style={{ background: "#F0F4F8" }}>

      {/* Header */}
      <div
        className="text-white shadow-md"
        style={{ background: "linear-gradient(135deg, #1D9E75 0%, #0F6E56 100%)" }}
      >
        <div className="max-w-5xl mx-auto px-4 py-5 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">💰 Money Collection System</h1>
            <p className="text-xs opacity-75 mt-0.5">
              Admin Dashboard — Full Access
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right hidden md:block">
              <p className="text-xs opacity-75">Logged in as</p>
              <p className="text-sm font-semibold">
                {localStorage.getItem("name")}
              </p>
            </div>
           <button
  onClick={handleLogout}
  className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition font-medium flex items-center gap-1"
>
  ← Logout
</button>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 pt-8 pb-10 space-y-6">
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
  );
}