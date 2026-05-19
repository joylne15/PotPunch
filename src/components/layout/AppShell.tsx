import { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { NAV_ITEMS } from "../../constants/navigation";
import { MobileHeader } from "./MobileHeader";
import { Sidebar } from "./Sidebar";
import { TopHeader } from "./TopHeader";

type AppShellProps = {
  children: ReactNode;
  title: string;
  subtitle?: string;
  profileName: string;
  onLogout: () => void;
};

const SIDEBAR_STORAGE_KEY = "potpunch.sidebarCollapsed";

export function AppShell({
  children,
  title,
  subtitle = "Let's check your update today",
  profileName,
  onLogout,
}: AppShellProps) {
  const location = useLocation();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(SIDEBAR_STORAGE_KEY) === "1";
  });

  useEffect(() => {
    window.localStorage.setItem(
      SIDEBAR_STORAGE_KEY,
      sidebarCollapsed ? "1" : "0",
    );
  }, [sidebarCollapsed]);

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex">
        <Sidebar
          currentPath={location.pathname}
          items={NAV_ITEMS}
          onLogout={onLogout}
          isCollapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((state) => !state)}
        />

        <div className="flex-1">
          <MobileHeader
            currentPath={location.pathname}
            title={title}
            profileName={profileName}
          />
          <TopHeader
            title={title}
            subtitle={subtitle}
            profileName={profileName}
            sidebarCollapsed={sidebarCollapsed}
          />
          <main className="px-4 pb-8 pt-[136px] md:px-8 md:pt-[136px] xl:px-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
