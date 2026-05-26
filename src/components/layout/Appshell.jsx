import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function AppShell({ user, activeNav, onNavChange, onLogout, children }) {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <Sidebar
          activeNav={activeNav}
          onNavChange={(id) => {
            onNavChange(id);
            setMobileSidebarOpen(false);
          }}
          onLogout={onLogout}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileSidebarOpen(false)}
          ></div>
          {/* Sidebar */}
          <div className="relative z-10">
            <Sidebar
              activeNav={activeNav}
              onNavChange={(id) => {
                onNavChange(id);
                setMobileSidebarOpen(false);
              }}
              onLogout={onLogout}
            />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Header
          user={user}
          onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />

        {/* Scrollable Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}