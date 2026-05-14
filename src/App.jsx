import React from "react";
import MemberTable from "./components/MemberTable";

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Member Contributions</h1>
      <MemberTable
        members={[
          { id: 1, regNo: "001", name: "Alice Johnson", total: 5000, paid: 3000 },
          { id: 2, regNo: "002", name: "Bob Smith", total: 7000, paid: 7000 },
          { id: 3, regNo: "003", name: "Charlie Davis", total: 6000, paid: 2000 },
        ]}
      />
    </div>
  );
}

export default App;