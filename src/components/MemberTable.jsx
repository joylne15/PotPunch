import React, { useState } from "react";

export default function MembersTable({ members, target, onDelete, onViewHistory }) {
  const [search, setSearch] = useState("");

  // ── Filter members based on search input ──
  const filtered = members.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase())
  );

 // ── Get status badge based on payment ──
  function getStatus(paid, remaining) {
    if (remaining === 0) {
      return {
        label: " Complete",
        className: "bg-green-100 text-green-700 border border-green-200",
      };
    } else if (paid > 0) {
      return {
        label: " Pending",
        className: "bg-amber-100 text-amber-700 border border-amber-200",
      };
    } else {
      return {
        label: " Not Paid",
        className: "bg-red-100 text-red-600 border border-red-200",
      };
    }
  }

  // ── Handle delete with confirmation ──
  function handleDelete(member) {
    if (window.confirm("Are you sure you want to delete " + member.name + "?")) {
      onDelete(member.id);
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

      {/* ── Table Header Section ── */}
      <div className="p-5 border-b border-gray-100">

        {/* Title row */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="text-lg"></span>
            <h2 className="text-sm font-semibold text-gray-700">
              Members & Payment Status
            </h2>
            {/* Member count badge */}
            <span className="bg-green-100 text-green-700 text-xs font-medium px-2 py-0.5 rounded-full">
              {members.length} members
            </span>
          </div>

        </div>

        {/* Search bar row */}
        <div className="flex gap-3 items-center">
          <div className="relative flex-1">
            {/* Search icon */}
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search member by name..."
              className="w-full border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 transition-all duration-200"
            />
            {/* Clear search button */}
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

      </div>

      {/* ── Empty State — no members added yet ── */}
      {members.length === 0 && (
        <div className="p-16 text-center">
          <div className="text-5xl mb-4">📋</div>
          <p className="text-gray-500 text-sm font-medium">No members yet</p>
          <p className="text-gray-400 text-xs mt-1">
            Add your first member using the form above
          </p>
        </div>
      )}

      {/* ── No search results ── */}
      {members.length > 0 && filtered.length === 0 && (
        <div className="p-16 text-center">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-gray-500 text-sm font-medium">
            No members found for "{search}"
          </p>
          <button
            onClick={() => setSearch("")}
            className="mt-3 text-xs text-green-600 hover:underline"
          >
            Clear search
          </button>
        </div>
      )}

      {/* ── Table — only shows when there are members ── */}
      {filtered.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full text-sm">

            {/* ── Table Head ── */}
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-400 uppercase tracking-wide border-b border-gray-100">
                <th className="px-4 py-3 text-left font-medium">Reg No</th>
                <th className="px-4 py-3 text-left font-medium">Full Name</th>
                <th className="px-4 py-3 text-left font-medium">Paid</th>
                <th className="px-4 py-3 text-left font-medium">Remaining</th>
                <th className="px-4 py-3 text-left font-medium">Progress</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-center font-medium">Actions</th>
              </tr>
            </thead>

            {/* ── Table Body ── */}
            <tbody>
              {filtered.map((member, index) => {
                const paid      = Number(member.paid);
                const remaining = target - paid;
                const pct       = Math.min(
                  Math.round((paid / target) * 100),
                  100
                );
                const status = getStatus(paid, remaining);

                // Generate registration number — REG001, REG002 etc
                const regNo = "REG" + String(index + 1).padStart(3, "0");

                return (
                  <tr
                    key={member.id}
                    className="border-t border-gray-50 hover:bg-gray-50 transition-colors duration-150"
                  >

                    {/* Reg No */}
                    <td className="px-4 py-4">
                      <span className="text-xs font-mono font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded-lg">
                        {regNo}
                      </span>
                    </td>

                    {/* Full Name */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        {/* Avatar circle with first letter */}
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold "
                          style={{ background: "#1D9E75" }}
                        >
                          {member.name.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-800">
                          {member.name}
                        </span>
                      </div>
                    </td>

                    {/* Paid */}
                    <td className="px-4 py-4">
                      <span
                        className="font-semibold"
                        style={{ color: "#1D9E75" }}
                      >
                        {paid.toLocaleString()}/=
                      </span>
                    </td>

                    {/* Remaining */}
                    <td className="px-4 py-4">
                      <span
                        className={`font-medium ${
                          remaining === 0 ? "text-green-600" : "text-amber-600"
                        }`}
                      >
                        {remaining.toLocaleString()}/=
                      </span>
                    </td>

                    {/* Progress bar */}
                    <td className="px-4 py-4">
                      <div className="w-32">
                        <div className="w-full bg-gray-100 rounded-full h-2 mb-1">
                          <div
                            className="h-2 rounded-full transition-all duration-700"
                            style={{
                              width: pct + "%",
                              background:
                                pct === 100
                                  ? "#1D9E75"
                                  : pct >= 50
                                  ? "#F59E0B"
                                  : "#EF4444",
                            }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-400">
                          {pct}%
                        </span>
                      </div>
                    </td>

                    {/* Status badge */}
                    <td className="px-4 py-4">
                      <span
                        className={`text-xs px-3 py-1.5 rounded-full font-medium ${status.className}`}
                      >
                        {status.label}
                      </span>
                    </td>

                    {/* Action buttons */}
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-center gap-2">

                        {/* View history button */}
                        <button
                          onClick={() => onViewHistory(member)}
                          title="View payment history"
                          className="flex items-center gap-1 text-xs border border-gray-200 text-gray-600 rounded-lg px-3 py-1.5 hover:bg-gray-100 hover:border-gray-300 transition-all duration-150"
                        >
                          📋 <span className="hidden md:inline">History</span>
                        </button>

                        {/* Delete button */}
                        <button
                          onClick={() => handleDelete(member)}
                          title="Delete member"
                          className="flex items-center gap-1 text-xs border border-red-200 text-red-500 rounded-lg px-3 py-1.5 hover:bg-red-50 hover:border-red-300 transition-all duration-150"
                        >
                          🗑 <span className="hidden md:inline">Delete</span>
                        </button>

                      </div>
                    </td>

                  </tr>
                );
              })}
            </tbody>

          </table>
        </div>
      )}

      {/* ── Table Footer ── */}
      {members.length > 0 && (
        <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-2">
          <span className="text-xs text-gray-400">
            Showing <strong>{filtered.length}</strong> of{" "}
            <strong>{members.length}</strong> members
          </span>
          <div className="flex gap-4 text-xs text-gray-400">
            <span>
              Total collected:{" "}
              <strong className="text-green-600">
                {members.reduce((s, m) => s + m.paid, 0).toLocaleString()}/=
              </strong>
            </span>
            <span>
              Total remaining:{" "}
              <strong className="text-amber-600">
                {members
                  .reduce((s, m) => s + (target - m.paid), 0)
                  .toLocaleString()}
                /=
              </strong>
            </span>
          </div>
        </div>
      )}

    </div>
  );
}