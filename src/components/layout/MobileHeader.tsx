import { Link } from "react-router-dom";
import { NAV_ITEMS } from "../../constants/navigation";
import { NavIcon } from "./NavIcon";

type MobileHeaderProps = {
  currentPath: string;
  title: string;
  profileName: string;
};

export function MobileHeader({ currentPath, title, profileName }: MobileHeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-slate-200 bg-white md:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-500 text-sm font-bold text-white">
            PP
          </div>
          <div>
            <p className="text-sm font-bold text-slate-900">PotPunch</p>
            <p className="text-xs font-medium text-slate-500">{title}</p>
          </div>
        </div>
        <div className="grid h-9 w-9 place-items-center rounded-lg bg-slate-100 text-xs font-bold text-slate-700">
          {profileName
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </div>
      </div>

      <nav className="flex gap-2 overflow-x-auto px-3 pb-3">
        {NAV_ITEMS.map((item) => {
          const active = currentPath.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex h-10 min-w-max items-center gap-2 rounded-lg border px-3 text-xs font-semibold ${
                active
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-white text-slate-600"
              }`}
            >
              <NavIcon icon={item.icon} className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
