import React, { useState } from "react";
import Header from "./components/Header";
import StartCard from "./components/StartCard";
import AddMemberForm from "./components/AddMemberForm";
import PaymentForm from "./components/PaymentForm";
import MemberTable from "./components/MemberTable";
import History from "./components/History";

const TARGET = 130000;

function App() {
  // ── Step 1: Create the members list state ──
  // This is the single source of truth for ALL components
  const [members, setMembers]         = useState([]);
  const [selectedMember, setSelected] = useState(null);
  const [showHistory, setShowHistory] = useState(false);

  // ── Step 2: Define all functions ──

  // Add a new member to the list
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

  // Record a payment for a member
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

  // Delete a member from the list
  function deleteMember(id) {
    setMembers(members.filter((m) => m.id !== id));
  }

  // Open history modal for a member
  function viewHistory(member) {
    setSelected(member);
    setShowHistory(true);
  }

  // ── Step 3: Calculate stats for StartCard ──
  const totalCollected = members.reduce((s, m) => s + m.paid, 0);
  const totalRemaining = Math.max(0, members.length * TARGET - totalCollected);

  // ── Step 4: Return JSX with props passed to every component ──
  return (
    <div className="min-h-screen" style={{ background: "#F0F4F8" }}>

      <div className="max-w-9xl mx-auto px-4 pt-4 pb-10 mt-6 space-y-6">

        {/* Header — no props needed */}
        <Header />

        {/* StartCard needs stats */}
        <StartCard
          totalMembers={members.length}
          totalCollected={totalCollected}
          totalRemaining={totalRemaining}
        />

        {/* Forms side by side */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6"> 

          {/* AddMemberForm needs the onAdd function */}
          <AddMemberForm onAdd={addMember} />

          {/* PaymentForm needs members list, target and onPayment function */}
          <PaymentForm
            members={members}
            target={TARGET}
            onPayment={recordPayment}
          />

        </div>

        {/* MemberTable needs members, target, delete and history functions */}
        <MemberTable
          members={members}
          target={TARGET}
          onDelete={deleteMember}
          onViewHistory={viewHistory}
        />

      </div>

      {/* History modal — only shows when showHistory is true */}
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

export default App;