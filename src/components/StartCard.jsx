import React from "react";

const StatsCards = ({ totalMembers, totalCollected, totalRemaining }) => {
  const cards = [
    {
      label: "Total Members",
      value: totalMembers,

      color: "text-green-700",
    },
    {
      label: "Total Collected",
      value: (totalCollected || 0).toLocaleString() + "/=",
      color: "text-green-700",
    },
    {
      label: "Total Remaining",
      value: (totalRemaining || 0).toLocaleString() + "/=",
      color: "text-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-xl border border-gray-200 p-5 text-center shadow-sm hover:-translate-y-1 transition-transform duration-200"
        >
          <div className="text-2xl mb-2">{card.icon}</div>
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">
            {card.label}
          </p>
          <p className={`text-2xl font-bold ${card.color}`}>{card.value}</p>
        </div>
      ))}
    </div>
  );
}
export default StatsCards;