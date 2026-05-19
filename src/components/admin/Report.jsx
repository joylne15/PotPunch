import React from "react";

export default function Reports({ members, target }) {
  const totalCollected = members.reduce((s, m) => s + m.paid, 0);
  const totalExpected = members.length * target;
  const totalRemaining = totalExpected - totalCollected;
  const completedCount = members.filter((m) => m.paid >= target).length;
  const pendingCount = members.filter((m) => m.paid > 0 && m.paid < target).length;
  const notPaidCount = members.filter((m) => m.paid === 0).length;
  const overallPct = totalExpected > 0 ? Math.round((totalCollected / totalExpected) * 100) : 0;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Reports</h1>
        <p className="text-sm text-gray-400 mt-0.5">Summary and analysis of all contributions</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Members", value: members.length, color: "text-gray-800", bg: "bg-gray-50", border: "border-gray-200" },
          { label: "Total Collected", value: totalCollected.toLocaleString() + "/=", color: "text-green-700", bg: "bg-green-50", border: "border-green-100" },
          { label: "Total Remaining", value: totalRemaining.toLocaleString() + "/=", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
          { label: "Completion", value: overallPct + "%", color: "text-blue-600", bg: "bg-blue-50", border: "border-blue-100" },
        ].map((card) => (
          <div key={card.label} className={`${card.bg} ${card.border} border rounded-2xl p-4 text-center shadow-sm`}>
            <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{card.label}</p>
            <p className={`text-xl font-bold ${card.color}`}>{card.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-sm font-semibold text-gray-700">Overall Collection Progress</h2>
          <span className="text-sm font-bold" style={{ color: "#1D9E75" }}>{overallPct}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-4 overflow-hidden mb-2">
          <div
            className="h-4 rounded-full transition-all duration-700"
            style={{ width: overallPct + "%", background: overallPct === 100 ? "#1D9E75" : overallPct >= 50 ? "#F59E0B" : "#EF4444" }}
          ></div>
        </div>
        <div className="flex justify-between text-xs text-gray-400">
          <span>0/=</span>
          <span>Target: {totalExpected.toLocaleString()}/=</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Member Status Breakdown</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-green-700">{completedCount}</p>
            <p className="text-xs text-green-600 mt-1">Completed</p>
          </div>
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-amber-600">{pendingCount}</p>
            <p className="text-xs text-amber-600 mt-1">Pending</p>
          </div>
          <div className="bg-red-50 border border-red-100 rounded-xl p-4 text-center">
            <p className="text-2xl font-bold text-red-600">{notPaidCount}</p>
            <p className="text-xs text-red-500 mt-1">Not Paid</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">Per Member Report</h2>
        </div>
        {members.length === 0 ? (
          <div className="p-10 text-center text-gray-400 text-sm">No members yet</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Paid</th>
                  <th className="px-4 py-3 text-left">Remaining</th>
                  <th className="px-4 py-3 text-left">Progress</th>
                </tr>
              </thead>
              <tbody>
                {members.map((m, i) => {
                  const pct = Math.min(Math.round((m.paid / target) * 100), 100);
                  return (
                    <tr key={m.id} className="border-t border-gray-50 hover:bg-gray-50">
                      <td className="px-4 py-3 text-gray-400">{i + 1}</td>
                      <td className="px-4 py-3 font-medium text-gray-800">{m.name}</td>
                      <td className="px-4 py-3 font-semibold" style={{ color: "#1D9E75" }}>{m.paid.toLocaleString()}/=</td>
                      <td className="px-4 py-3 text-amber-600">{(target - m.paid).toLocaleString()}/=</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-100 rounded-full h-2">
                            <div className="h-2 rounded-full" style={{ width: pct + "%", background: pct === 100 ? "#1D9E75" : pct >= 50 ? "#F59E0B" : "#EF4444" }}></div>
                          </div>
                          <span className="text-xs text-gray-400">{pct}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
