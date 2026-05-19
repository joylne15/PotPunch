import { Link } from "react-router-dom";
import type { NavIconKey, NavItem } from "../../constants/navigation";
import {
  AlertIcon,
  ChevronCollapseIcon,
  ChevronExpandIcon,
  DashboardIcon,
  LogoutIcon,
  MessageIcon,
  UsersIcon,
} from "./icons";

type SidebarProps = {
  currentPath: string;
  items: NavItem[];
  onLogout: () => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
};

function NavIcon({ icon, className }: { icon: NavIconKey; className?: string }) {
  switch (icon) {
    case "dashboard":
      return <DashboardIcon className={className} />;
    case "messages":
      return <MessageIcon className={className} />;
    case "users":
      return <UsersIcon className={className} />;
    default:
      return <AlertIcon className={className} />;
  }
}

export function Sidebar({
  currentPath,
  items,
  onLogout,
  isCollapsed,
  onToggleCollapse,
}: SidebarProps) {
  return (
    <aside
      className={`hidden min-h-screen border-r border-slate-200 bg-white transition-[width] duration-300 xl:block ${
        isCollapsed ? "w-[96px]" : "w-[300px]"
      }`}
    >
      <div
        className={`flex h-[108px] items-center border-b border-slate-100 ${
          isCollapsed ? "justify-center gap-2 px-2" : "justify-between px-6"
        }`}
      >
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-emerald-500 font-bold text-white">
            PP
          </div>
          {!isCollapsed ? (
            <span className="text-xl font-bold tracking-tight text-emerald-600">PotPunch</span>
          ) : null}
        </div>

        <button
          onClick={onToggleCollapse}
          className="grid h-9 w-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100"
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          title={isCollapsed ? "Expand" : "Collapse"}
        >
          {isCollapsed ? (
            <ChevronExpandIcon className="h-4 w-4" />
          ) : (
            <ChevronCollapseIcon className="h-4 w-4" />
          )}
        </button>
      </div>

      <div className={`space-y-2 ${isCollapsed ? "p-3" : "p-6"}`}>
        {items.map((item) => {
          const isActive = currentPath.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`group flex items-center rounded-xl transition ${
                isCollapsed ? "justify-center px-2 py-3" : "gap-3 px-4 py-3"
              } ${
                isActive
                  ? "bg-emerald-50 text-emerald-600"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
              title={isCollapsed ? item.label : undefined}
            >
              <NavIcon
                icon={item.icon}
                className="h-5 w-5 shrink-0"
              />
              {!isCollapsed ? (
                <span className="text-base font-medium">{item.label}</span>
              ) : null}
            </Link>
          );
        })}

        <button
          onClick={onLogout}
          className={`mt-6 flex w-full items-center rounded-xl border border-rose-200 text-rose-500 transition hover:bg-rose-50 ${
            isCollapsed ? "justify-center px-2 py-3" : "gap-3 px-4 py-3"
          }`}
          title={isCollapsed ? "Logout" : undefined}
        >
          <LogoutIcon className="h-5 w-5 shrink-0" />
          {!isCollapsed ? (
            <span className="text-left font-semibold">Logout</span>
          ) : null}
        </button>
      </div>
    </aside>
  );
}
