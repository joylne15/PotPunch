import { ActivityFeed } from "../components/dashboard/ActivityFeed";
import { StatCard } from "../components/dashboard/StatCard";
import { AppShell } from "../components/layout/AppShell";

const STATS = [
  { label: "Revenue", value: "$24,580" },
  { label: "Members", value: "322" },
  { label: "Pending", value: "18" },
];

type AdminDashboardPageProps = {
  onLogout: () => void;
  profileName: string;
};

export function AdminDashboardPage({ onLogout, profileName }: AdminDashboardPageProps) {
  return (
    <AppShell title="Dashboard" onLogout={onLogout} profileName={profileName}>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 lg:col-span-2">
          <h4 className="mb-4 text-xl font-bold text-slate-900">Overview</h4>
          <div className="grid gap-4 md:grid-cols-3">
            {STATS.map((stat) => (
              <StatCard key={stat.label} label={stat.label} value={stat.value} />
            ))}
          </div>
        </div>
        <ActivityFeed />
      </div>
    </AppShell>
  );
}
