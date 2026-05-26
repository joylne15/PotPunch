import React from 'react';

const statIcons = {
  members: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  ),
  collected: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  remaining: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
  ),
  progress: (
    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
  ),
};

const statColors = {
  members: 'bg-blue-50 text-blue-600',
  collected: 'bg-emerald-50 text-emerald-600',
  remaining: 'bg-orange-50 text-orange-600',
  progress: 'bg-purple-50 text-purple-600',
};

export default function StatCards({ stats }) {
  const cards = [
    {
      key: 'members',
      label: 'Total Members',
      value: stats.totalMembers,
      subtext: `${stats.activeMembers} active`,
    },
    {
      key: 'collected',
      label: 'Total Collected',
      value: `KSH ${stats.totalCollected?.toLocaleString()}`,
      subtext: `From ${stats.paidMembers} members`,
    },
    {
      key: 'remaining',
      label: 'Remaining',
      value: `KSH ${stats.totalRemaining?.toLocaleString()}`,
      subtext: `${stats.unpaidMembers} unpaid`,
    },
    {
      key: 'progress',
      label: 'Progress',
      value: `${stats.progressPercent}%`,
      subtext: `Target: KSH ${stats.target?.toLocaleString()}`,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {cards.map((card) => (
        <div
          key={card.key}
          className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition-shadow duration-200"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              {card.label}
            </span>
            <div className={`p-2 rounded-lg ${statColors[card.key]}`}>
              {statIcons[card.key]}
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-900">{card.value}</p>
          <p className="text-xs text-gray-500 mt-1">{card.subtext}</p>
        </div>
      ))}
    </div>
  );
}