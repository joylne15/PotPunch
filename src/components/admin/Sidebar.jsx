import React from "react";

const menuItems = [
  { id: "dashboard", icon: "\u{1F3E0}", label: "Dashboard" },
  { id: "members", icon: "\u{1F465}", label: "Members" },
  { id: "payments", icon: "\u{1F4B5}", label: "Payments" },
  { id: "reports", icon: "\u{1F4CA}", label: "Reports" },
  { id: "settings", icon: "\u2699\uFE0F", label: "Settings" },
];

export default function Sidebar({ activePage, onNavigate, onLogout, isOpen, onClose }) {
  return (
    <>
      {isOpen && (
        <button
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={onClose}
          aria-label="Close menu"
        />
      )}

      <div
        className={`fixed left-0 top-0 h-full w-56 flex flex-col shadow-lg z-50 transform transition-transform duration-200 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "linear-gradient(180deg, #0F6E56 0%, #1D9E75 100%)" }}
      >
        <div className="px-5 py-6 border-b border-white border-opacity-20">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-white bg-opacity-20 rounded-xl flex items-center justify-center text-lg">
              {"\u{1F4B0}"}
            </div>
            <div>
              <p className="text-white font-bold text-sm leading-tight">Collection</p>
              <p className="text-white opacity-60 text-xs">Panel</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                onNavigate(item.id);
                onClose();
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-150 ${
                activePage === item.id
                  ? "bg-green-100 text-green-800 shadow-sm"
                  : "text-white hover:bg-green-600 hover:text-green-100"
              }`}
            >
              <span className="text-base">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="px-3 py-4 border-t border-white border-opacity-20">
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-white hover:bg-white hover:bg-opacity-15 transition-all duration-150"
          >
            <span className="text-base">{"\u{1F6AA}"}</span>
            <span>Logout</span>
          </button>
        </div>
      </div>
    </>
  );
}
