import React from "react";
import MemberTable from "./components/MemberTable";
import Header from "./components/Header";
import AddMemberForm from "./components/AddMemberForm";
import History from "./components/History";
import StartCard from "./components/StartCard";
import PaymentForm from "./components/PaymentForm";

const App = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <StartCard />
      <PaymentForm />
      <AddMemberForm />
      <MemberTable />
      <History />
    </div>
  );

  
}

export default App;