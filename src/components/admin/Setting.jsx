import React, { useState } from "react";

export default function Settings({ target, onTargetChange }) {
  const [newTarget, setNewTarget] = useState(target);
  const [saved, setSaved] = useState(false);

  function handleSave() {
    if (!newTarget || newTarget <= 0) return;
    onTargetChange(Number(newTarget));
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Settings</h1>
        <p className="text-sm text-gray-400 mt-0.5">Configure your collection system</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">Collection Target</h2>
        <p className="text-xs text-gray-400 mb-4">Set the target amount each member needs to contribute.</p>
        <div className="flex gap-3 items-center max-w-sm">
          <input
            type="number"
            value={newTarget}
            onChange={(e) => setNewTarget(e.target.value)}
            className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100"
          />
          <button
            onClick={handleSave}
            className="text-white rounded-xl px-5 py-2.5 text-sm font-medium transition"
            style={{ background: "#1D9E75" }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#0F6E56")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#1D9E75")}
          >
            Save
          </button>
        </div>
        {saved && (
          <p className="text-xs text-green-600 mt-2">Success: Target updated to {Number(newTarget).toLocaleString()}/=</p>
        )}
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
        <h2 className="text-sm font-semibold text-gray-700 mb-4">System Information</h2>
        <div className="space-y-3 text-sm">
          {[
            { label: "System name", value: "Money Collection System" },
            { label: "Version", value: "1.0.0" },
            { label: "Currency", value: "TZS (Tanzanian Shilling)" },
            { label: "Current target", value: target.toLocaleString() + "/=" },
            { label: "Frontend", value: "React + Tailwind CSS" },
            { label: "Backend", value: "Python + FastAPI (coming soon)" },
            { label: "Database", value: "PostgreSQL (coming soon)" },
          ].map((item) => (
            <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
              <span className="text-gray-400">{item.label}</span>
              <span className="font-medium text-gray-700">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
