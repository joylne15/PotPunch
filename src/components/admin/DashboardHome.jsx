import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Members from "./Member";
import Payments from "./Payment";
import Reports from "./Report";
import Settings from "./Setting";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelected] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const [target, setTarget] = useState(130000);

  function addMember(name) {
    const exists = members.find((m) => m.name.toLowerCase() === name.toLowerCase());
    if (exists) return { error: "Member already exists!" };
    setMembers([...members, { id: Date.now(), name, paid: 0, payments: [] }]);
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
              payments: [...m.payments, { amount, date: new Date().toLocaleString() }],
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

  function renderPage() {
    switch (activePage) {
      case "dashboard":
      case "members":
        return (
          <Members
            members={members}
            target={target}
            onAdd={addMember}
            onDelete={deleteMember}
            onViewHistory={viewHistory}
            showHistory={showHistory}
            selectedMember={selectedMember}
            onCloseHistory={() => setShowHistory(false)}
          />
        );
      case "payments":
        return <Payments members={members} target={target} onPayment={recordPayment} />;
      case "reports":
        return <Reports members={members} target={target} />;
      case "settings":
        return <Settings target={target} onTargetChange={(val) => setTarget(val)} />;
      default:
        return null;
    }
  }

  return (
    <div className="min-h-screen flex" style={{ background: "#F0F4F8" }}>
      <Sidebar
        activePage={activePage}
        onNavigate={setActivePage}
        onLogout={handleLogout}
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      />

      <div className="flex-1 ml-0 md:ml-56">
        <div className="bg-white border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-gray-200 text-gray-700 hover:bg-green-50 hover:border-green-300"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              ?
            </button>
            <div>
              <h2 className="text-sm font-semibold text-gray-700 capitalize">{activePage}</h2>
              <p className="text-xs text-gray-400">Money Collection System</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-semibold text-gray-700">{localStorage.getItem("name")}</p>
              <p className="text-xs text-gray-400">Administrator</p>
            </div>
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm"
              style={{ background: "#1D9E75" }}
            >
              A
            </div>
          </div>
        </div>

        <div className="p-4 md:p-6">{renderPage()}</div>
      </div>
    </div>
  );
}
