import React, { useState } from "react";

const MemberTable = ({ members, target, onDelete, onViewHistory }) => {
  const [search, setSearch] = useState("");

  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

  function handleDelete(member) {
    if (window.confirm("Are you sure you want to delete " + member.name + "?")) {
      onDelete(member.id);
    }
  }

  function getStatus(paid, remaining) {
    if (remaining === 0) {
      return {
        badge: " Complete",
        class: "bg-green-100 text-green-700",
      };
    } else if (paid > 0) {
      return {
        badge: " Pending",
        class: "bg-amber-100 text-amber-700",
      };
    } else {
      return {
        badge: " Not paid",
        class: "bg-red-100 text-red-600",
      };
    }
  }

  // ── Empty state — no members at all ──
  if (!members.length) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="p-5 border-b border-gray-100">
          <h2 className="text-sm font-semibold text-gray-700">
            👥 Members & Payment Status
          </h2>
        </div>
        <div className="p-12 text-center">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-gray-400 text-sm">
            No members yet. Add your first member above!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">

      {/* ── Header ── */}
      <div className="p-5 border-b border-gray-100">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">
           Members & Payment Status
        </h2>

        {/* ── Search and Clear All row ── */}
        <div className="flex gap-3 items-center">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="🔍 Search member..."
            className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
          />
          <button
            onClick={() => {
              if (window.confirm("Clear ALL members? This cannot be undone.")) {
                members.forEach((m) => onDelete(m.id));
              }
            }}
            className="flex items-center gap-1 bg-red-500 hover:bg-red-600 text-white text-xs font-medium px-4 py-2 rounded-lg transition-colors duration-200 whitespace-nowrap"
          >
            🗑 Clear All
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">

          {/* ── Table Head ── */}
          <thead className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wide">
            <tr>
              <th className="px-4 py-3 text-left font-medium">#</th>
              <th className="px-4 py-3 text-left font-medium">Name</th>
              <th className="px-4 py-3 text-left font-medium">Paid</th>
              <th className="px-4 py-3 text-left font-medium">Remaining</th>
              <th className="px-4 py-3 text-left font-medium">Progress</th>
              <th className="px-4 py-3 text-left font-medium">Status</th>
              <th className="px-4 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>

          {/* ── Table Body ── */}
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="px-4 py-8 text-center text-gray-400 text-sm"
                >
                  No members match your search.
                </td>
              </tr>
            ) : (
              filtered.map((member, index) => {
                const paid      = Number(member.paid);
                const remaining = target - paid;
                const pct       = Math.min(
                  Math.round((paid / target) * 100),
                  100
                );
                const status = getStatus(paid, remaining);

                return (
                  <tr
                    key={member.id}
                    className="border-t border-gray-100 hover:bg-gray-50 transition-colors duration-150"
                  >
                    {/* Number */}
                    <td className="px-4 py-4 text-gray-400 text-xs">
                      {index + 1}
                    </td>

                    {/* Name */}
                    <td className="px-4 py-4 font-medium text-gray-800">
                      {member.name}
                    </td>

                    {/* Paid */}
                    <td
                      className="px-4 py-4 font-semibold"
                      style={{ color: "#1D9E75" }}
                    >
                      {paid.toLocaleString()}/=
                    </td>

                    {/* Remaining */}
                    <td className="px-4 py-4 text-amber-600 font-medium">
                      {remaining.toLocaleString()}/=
                    </td>

                    {/* Progress bar */}
                    <td className="px-4 py-4">
                      <div className="w-28 bg-gray-100 rounded-full h-2 mb-1">
                        <div
                          className="h-2 rounded-full transition-all duration-500"
                          style={{
                            width: pct + "%",
                            background: "#1D9E75",
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-400">{pct}%</span>
                    </td>

                    {/* Status badge */}
                    <td className="px-4 py-4">
                      <span
                        className={`text-xs px-3 py-1 rounded-full font-medium ${status.class}`}
                      >
                        {status.badge}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => onViewHistory(member)}
                          title="View payment history"
                          className="text-xs border border-gray-200 rounded-md px-3 py-1.5 hover:bg-gray-100 transition-colors duration-150"
                        >
                          📋
                        </button>
                        <button
                          onClick={() => handleDelete(member)}
                          title="Delete member"
                          className="text-xs border border-red-200 rounded-md px-3 py-1.5 hover:bg-red-50 text-red-500 transition-colors duration-150"
                        >
                          🗑
                        </button>
                      </div>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* ── Footer — total count ── */}
      <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 text-xs text-gray-400 flex justify-between items-center">
        <span>
          Showing {filtered.length} of {members.length} members
        </span>
        <span>
          {members.filter((m) => m.paid >= target).length} completed &nbsp;·&nbsp;
          {members.filter((m) => m.paid < target).length} pending
        </span>
      </div>

    </div>
  );
}
export default MemberTable;