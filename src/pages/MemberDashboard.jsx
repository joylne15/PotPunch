import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const TARGET = 130000;

// Temporary data — will come from FastAPI + PostgreSQL later
const memberData = {
  name: "Juma Ally",
  regNo: "REG001",
  email: "",
  paid: 80000,
  payments: [
    { amount: 50000, date: "1 May 2026, 10:00 AM" },
    { amount: 30000, date: "10 May 2026, 02:30 PM" },
  ],
};

export default function MemberDashboard() {
  const navigate          = useNavigate();
  const [tab, setTab]     = useState("overview");
  const name              = localStorage.getItem("name") || "Member";
  const paid              = Number(memberData.paid);
  const remaining         = TARGET - paid;
  const pct               = Math.min(Math.round((paid / TARGET) * 100), 100);

  function handleLogout() {
    localStorage.clear();
    navigate("/login");
  }

  function getStatusBadge() {
    if (remaining === 0) return { label: "Fully Paid",  cls: "bg-green-100 text-green-700 border border-green-200" };
    else if (paid > 0)   return { label: " Pending",     cls: "bg-amber-100 text-amber-700 border border-amber-200" };
    else                 return { label: " Not Paid Yet", cls: "bg-red-100 text-red-600 border border-red-200" };
  }

  const status = getStatusBadge();

  return (
    <div className="min-h-screen" style={{ background: "#F0F4F8" }}>

      {/* ── Header ── */}
      <div
        className="text-white shadow-md"
        style={{ background: "linear-gradient(135deg, #1D9E75 0%, #0F6E56 100%)" }}
      >
        <div className="max-w-2xl mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Avatar */}
            <div className="w-10 h-10 rounded-full bg-white bg-opacity-25 flex items-center justify-center font-bold text-white text-base">
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-base font-bold"> My Contributions</h1>
              <p className="text-xs opacity-75">Welcome back, {name} </p>
            </div>
          </div>
        </div>
<button
  onClick={handleLogout}
  className="text-xs bg-white bg-opacity-20 hover:bg-opacity-30 text-white px-4 py-2 rounded-lg transition font-medium flex items-center gap-1"
>
  ← Logout
</button>
        {/* ── Tabs inside header ── */}
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex">
            {["overview", "history"].map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2.5 text-xs font-semibold uppercase tracking-wide transition-all border-b-2 ${
                  tab === t
                    ? "border-white text-white"
                    : "border-transparent text-white opacity-60 hover:opacity-90"
                }`}
              >
                {t === "overview" ? "📊 Overview" : "📋 Payment History"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Page content ── */}
      <div className="max-w-2xl mx-auto px-4 pt-6 pb-10 space-y-5">

        {/* ── Member Info Card ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
              style={{ background: "#1D9E75" }}
            >
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="font-semibold text-gray-800 text-base">{name}</p>
              <p className="text-xs text-gray-400 mt-0.5">
                {memberData.regNo} · {memberData.email}
              </p>
            </div>
          </div>
          <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${status.cls}`}>
            {status.label}
          </span>
        </div>

        {/* ── Overview Tab ── */}
        {tab === "overview" && (
          <>
            {/* Stats cards */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  Paid
                </p>
                <p className="text-xl font-bold text-green-700">
                  {paid.toLocaleString()}/=
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  Remaining
                </p>
                <p className="text-xl font-bold text-amber-600">
                  {remaining.toLocaleString()}/=
                </p>
              </div>
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 text-center">
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                  Progress
                </p>
                <p className="text-xl font-bold text-green-700">{pct}%</p>
              </div>
            </div>

            {/* Progress card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-sm font-semibold text-gray-700">
                   Payment Progress
                </h2>
                <span className="text-xs font-bold" style={{ color: "#1D9E75" }}>
                  {pct}% complete
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-100 rounded-full h-4 mb-2 overflow-hidden">
                <div
                  className="h-4 rounded-full transition-all duration-700"
                  style={{
                    width: pct + "%",
                    background:
                      pct === 100 ? "#1D9E75" : pct >= 50 ? "#F59E0B" : "#EF4444",
                  }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mb-5">
                <span>0/=</span>
                <span>Target: {TARGET.toLocaleString()}/=</span>
              </div>

              {/* Paid / Remaining breakdown */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-green-50 border border-green-100 rounded-xl p-4">
                  <p className="text-xs text-green-600 mb-1">✅ Amount Paid</p>
                  <p className="text-lg font-bold text-green-700">
                    {paid.toLocaleString()}/=
                  </p>
                  <p className="text-xs text-green-500 mt-1">
                    {memberData.payments.length} payment(s) made
                  </p>
                </div>
                <div className="bg-amber-50 border border-amber-100 rounded-xl p-4">
                  <p className="text-xs text-amber-600 mb-1"> Still Remaining</p>
                  <p className="text-lg font-bold text-amber-700">
                    {remaining.toLocaleString()}/=
                  </p>
                  <p className="text-xs text-amber-500 mt-1">
                    {remaining === 0 ? "All paid!" : "Please complete payment"}
                  </p>
                </div>
              </div>
            </div>

            {/* Target info card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <h2 className="text-sm font-semibold text-gray-700 mb-4">
                 Contribution Target
              </h2>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Target amount</span>
                <span className="text-sm font-semibold text-gray-800">
                  {TARGET.toLocaleString()}/=
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Amount paid</span>
                <span className="text-sm font-semibold text-green-700">
                  {paid.toLocaleString()}/=
                </span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-xs text-gray-500">Amount remaining</span>
                <span className="text-sm font-semibold text-amber-600">
                  {remaining.toLocaleString()}/=
                </span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-xs text-gray-500">Total payments made</span>
                <span className="text-sm font-semibold text-gray-800">
                  {memberData.payments.length}
                </span>
              </div>
            </div>

            {/* Info note */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
              <p className="text-xs text-blue-600">
                ℹ️ Contact the admin if you notice any errors in your records.
              </p>
            </div>
          </>
        )}

        {/* ── History Tab ── */}
        {tab === "history" && (
          <>
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

              {/* History header */}
              <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-sm font-semibold text-gray-700">
                  📋 Payment History
                </h2>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                  {memberData.payments.length} payments
                </span>
              </div>

              {/* History list */}
              {memberData.payments.length === 0 ? (
                <div className="p-12 text-center">
                  <div className="text-4xl mb-3">📭</div>
                  <p className="text-gray-400 text-sm">No payments recorded yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {memberData.payments.map((p, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition"
                    >
                      <div className="flex items-center gap-3">
                        {/* Payment number */}
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold "
                          style={{ background: "#1D9E75" }}
                        >
                          {i + 1}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800">
                            {Number(p.amount).toLocaleString()}/=
                          </p>
                          <p className="text-xs text-gray-400 mt-0.5">{p.date}</p>
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
                </div>
              )}

              {/* History footer total */}
              <div className="px-5 py-4 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                  Total paid
                </span>
                <span className="text-base font-bold" style={{ color: "#1D9E75" }}>
                  {paid.toLocaleString()}/=
                </span>
              </div>
            </div>

            {/* Info note */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 text-center">
              <p className="text-xs text-blue-600">
                ℹ️ Contact the admin if you notice any errors in your records.
              </p>
            </div>
          </>
        )}

      </div>
    </div>
  );
}