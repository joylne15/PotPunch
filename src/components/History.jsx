import React, { useState } from "react";

export default function History({ member, target, onClose }) {
  const [activeTab, setActiveTab] = useState("history");

  const paid      = Number(member.paid);
  const remaining = target - paid;
  const pct       = Math.min(Math.round((paid / target) * 100), 100);

  function getStatusBadge() {
    if (remaining === 0)   return { label: " Complete", className: "bg-green-100 text-green-700 border border-green-200" };
    else if (paid > 0)     return { label: "Pending",  className: "bg-amber-100 text-amber-700 border border-amber-200" };
    else                   return { label: " Not Paid", className: "bg-red-100 text-red-600 border border-red-200" };
  }

  const status = getStatusBadge();

  return (
    // ── Overlay — clicking outside closes the modal ──
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-4"
      style={{ background: "rgba(0,0,0,0.45)" }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* ── Modal box ── */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">

        {/* ── Modal Header ── */}
        <div
          className="px-5 py-4 flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, #1D9E75 0%, #0F6E56 100%)" }}
        >
          <div className="flex items-center gap-3">
            {/* Avatar circle */}
            <div className="w-10 h-10 rounded-full bg-white bg-opacity-25 flex items-center justify-center text-white font-bold text-base">
              {member.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-white font-semibold text-sm">
                {member.name}
              </h3>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${status.className}`}>
                {status.label}
              </span>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="text-white opacity-70 hover:opacity-100 text-xl font-bold transition"
          >
            ✕
          </button>
        </div>

        {/* ── Tabs ── */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab("history")}
            className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wide transition-all ${
              activeTab === "history"
                ? "text-green-700 border-b-2 border-green-600 bg-green-50"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            }`}
          >
            📋 Payment History
          </button>
          <button
            onClick={() => setActiveTab("summary")}
            className={`flex-1 py-3 text-xs font-semibold uppercase tracking-wide transition-all ${
              activeTab === "summary"
                ? "text-green-700 border-b-2 border-green-600 bg-green-50"
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            }`}
          >
            📊 Summary
          </button>
        </div>

        {/* ── Tab Content ── */}
        <div className="max-h-80 overflow-y-auto">

          {/* ── History Tab ── */}
          {activeTab === "history" && (
            <div className="p-5">
              {member.payments.length === 0 ? (
                <div className="text-center py-10">
                  <div className="text-4xl mb-3">📭</div>
                  <p className="text-gray-400 text-sm">No payments recorded yet</p>
                  <p className="text-gray-300 text-xs mt-1">
                    Payments will appear here once recorded
                  </p>
                </div>
              ) : (
                <div>
                  {/* Payment list */}
                  {member.payments.map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0"
                    >
                      <div className="flex items-center gap-3">
                        {/* Payment number circle */}
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold "
                          style={{ background: "#1D9E75" }}
                        >
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {Number(p.amount).toLocaleString()}/=
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">
                            {p.date}
                          </p>
                        </div>
                      </div>
                      <span
                        className="text-sm font-bold"
                        style={{ color: "#1D9E75" }}
                      >
                        +{Number(p.amount).toLocaleString()}
                      </span>
                    </div>
                  ))}

                  {/* Total paid row */}
                  <div className="mt-3 pt-3 border-t-2 border-gray-200 flex justify-between items-center">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Total paid
                    </span>
                    <span className="text-base font-bold" style={{ color: "#1D9E75" }}>
                      {paid.toLocaleString()}/=
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ── Summary Tab ── */}
          {activeTab === "summary" && (
            <div className="p-5">

              {/* Stat cards */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                <div className="bg-green-50 border border-green-100 rounded-xl p-3 text-center">
                  <p className="text-xs text-green-600 mb-1">💵 Total Paid</p>
                  <p className="text-lg font-bold text-green-700">
                    {paid.toLocaleString()}/=
                  </p>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 text-center">
                  <p className="text-xs text-amber-600 mb-1">⏳ Remaining</p>
                  <p className="text-lg font-bold text-amber-700">
                    {remaining.toLocaleString()}/=
                  </p>
                </div>
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 text-center">
                  <p className="text-xs text-blue-600 mb-1">Target</p>
                  <p className="text-lg font-bold text-blue-700">
                    {target.toLocaleString()}/=
                  </p>
                </div>
                <div className="bg-purple-50 border border-purple-100 rounded-xl p-3 text-center">
                  <p className="text-xs text-purple-600 mb-1"> Payments</p>
                  <p className="text-lg font-bold text-purple-700">
                    {member.payments.length}
                  </p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-4">
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <span className="font-medium">Payment progress</span>
                  <span className="font-bold" style={{ color: "#1D9E75" }}>
                    {pct}%
                  </span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-3">
                  <div
                    className="h-3 rounded-full transition-all duration-700"
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
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0/=</span>
                  <span>{target.toLocaleString()}/=</span>
                </div>
              </div>

              {/* Status */}
              <div className="text-center">
                <span className={`text-xs px-4 py-1.5 rounded-full font-medium ${status.className}`}>
                  {status.label}
                </span>
              </div>

            </div>
          )}

        </div>

        {/* ── Modal Footer ── */}
        <div className="px-5 py-4 bg-gray-50 border-t border-gray-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 border border-gray-200 text-gray-600 rounded-xl py-2.5 text-sm font-medium hover:bg-gray-100 transition"
          >
            Close
          </button>
          <button
            onClick={onClose}
            className="flex-1 text-white rounded-xl py-2.5 text-sm font-medium transition"
            style={{ background: "#1D9E75" }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#0F6E56")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#1D9E75")}
          >
            Done ✓
          </button>
        </div>

      </div>
    </div>
  );
}