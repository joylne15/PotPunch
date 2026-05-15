import React from "react";

export default function Header() {
  return (
    <div
      className="text-white shadow-md mb-8"
      style={{ background: "linear-gradient(135deg, #1D9E75 0%, #0F6E56 100%)" }}
    >
      {/* Main header content */}
      <div className="max-w-9xl mx-auto px-6 py-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-2">
           Money Collection System
        </h1>
        <p className="text-sm opacity-80">
          Track and manage member contributions easily
        </p>

        {/* Target badge */}
        <div className="mt-4 inline-flex items-center gap-2 bg-white text-green-700 px-5 py-2 rounded-full text-sm font-semibold shadow-sm">
         Target per member: <span className="font-bold">130,000/=</span>
        </div>
      </div>
    </div>
  );
}