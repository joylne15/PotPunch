import { BellIcon, MoonIcon, SearchIcon } from "./icons";

type TopHeaderProps = {
  title: string;
  subtitle: string;
  profileName: string;
  sidebarCollapsed: boolean;
};

export function TopHeader({
  title,
  subtitle,
  profileName,
  sidebarCollapsed,
}: TopHeaderProps) {
  return (
    <header
      className={`fixed right-0 top-0 z-20 hidden h-[108px] items-center justify-between border-b border-slate-200 bg-white px-10 md:flex ${
        sidebarCollapsed ? "xl:left-[96px]" : "xl:left-[300px]"
      }`}
    >
      <div>
        <h3 className="text-3xl font-bold text-slate-900">{title}</h3>
        <p className="text-sm font-medium text-slate-500">{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        <label className="flex h-14 w-[320px] items-center gap-3 rounded-lg bg-slate-100 px-4">
          <SearchIcon className="h-4 w-4 text-slate-500" />
          <input
            className="w-full bg-transparent text-sm text-slate-700 placeholder:text-slate-500 focus:outline-none"
            placeholder="Search..."
          />
        </label>

        <button
          className="grid h-12 w-12 place-items-center rounded-xl border border-emerald-300 text-slate-700 transition hover:bg-emerald-50"
          aria-label="Toggle theme"
        >
          <MoonIcon className="h-5 w-5" />
        </button>

        <button
          className="grid h-12 w-12 place-items-center rounded-xl border border-emerald-300 text-slate-700 transition hover:bg-emerald-50"
          aria-label="Notifications"
        >
          <BellIcon className="h-5 w-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="grid h-12 w-12 place-items-center rounded-xl bg-slate-200 font-semibold text-slate-700">
            JD
          </div>
          <div>
            <p className="font-bold text-slate-900">{profileName}</p>
            <p className="text-sm text-slate-500">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
