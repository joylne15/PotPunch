import React, { useState } from "react";
import MemberTable from "./components/MemberTable";
import Header from "./components/Header";
import AddMemberForm from "./components/AddMemberForm";
import History from "./components/History";
import StartCard from "./components/StartCard";
import PaymentForm from "./components/PaymentForm";

const App = () => {
  const [members, setMembers] = useState([]);
  const target = 130000;

  const handleAddMember = (name) => {
    const newMember = {
      id: Date.now(),
      name,
      paid: 0,
      history: []
    };
    setMembers([...members, newMember]);
    return { success: true };
  };

  const handleDeleteMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
  };

  const handlePayment = (memberId, amount) => {
    setMembers(members.map(m => {
      if (m.id === memberId) {
        return {
          ...m,
          paid: m.paid + amount,
          history: [...m.history, { date: new Date().toISOString(), amount }]
        };
      }
      return m;
    }));
  };

  const handleViewHistory = (member) => {
    alert(`Payment history for ${member.name}:\n${member.history.map(h => `${new Date(h.date).toLocaleDateString()}: ${h.amount.toLocaleString()}/=`).join('\n')}`);
  };

  const totalMembers = members.length;
  const totalCollected = members.reduce((sum, m) => sum + m.paid, 0);
  const totalRemaining = (totalMembers * target) - totalCollected;

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <StartCard totalMembers={totalMembers} totalCollected={totalCollected} totalRemaining={totalRemaining} />
      <PaymentForm members={members} target={target} onPayment={handlePayment} />
      <AddMemberForm onAdd={handleAddMember} />
      <MemberTable members={members} target={target} onDelete={handleDeleteMember} onViewHistory={handleViewHistory} />
      <History />
    </div>
  );

  
}

export default App;