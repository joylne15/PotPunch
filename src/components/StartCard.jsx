import React from "react";
const StartCard = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Welcome to the Money Collection System</h2>
      <p className="text-gray-600 mb-6">Track contributions and manage members efficiently.</p>
      <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition">Get Started</button>
    </div>
  );
};

export default StartCard;