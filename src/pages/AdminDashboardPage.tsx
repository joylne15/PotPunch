import { ActivityFeed } from "../components/dashboard/ActivityFeed";
import { CollectionProgress } from "../components/dashboard/CollectionProgress";
import { MembersPreview } from "../components/dashboard/MembersPreview";
import { StatCard } from "../components/dashboard/StatCard";
import { AppShell } from "../components/layout/AppShell";

const STATS = [
  { label: "Collected", value: "88,400", caption: "Confirmed this cycle", tone: "emerald" as const },
  { label: "Members", value: "322", caption: "Active contribution records", tone: "sky" as const },
  { label: "Pending", value: "18", caption: "Need admin follow up", tone: "amber" as const },
];

type AdminDashboardPageProps = {
  onLogout: () => void;
  profileName: string;
};

export function AdminDashboardPage({ onLogout, profileName }: AdminDashboardPageProps) {
  return (
    <AppShell title="Dashboard" onLogout={onLogout} profileName={profileName}>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          {STATS.map((stat) => (
            <StatCard
              key={stat.label}
              label={stat.label}
              value={stat.value}
              caption={stat.caption}
              tone={stat.tone}
            />
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <CollectionProgress />
            <MembersPreview />
          </div>
        <ActivityFeed />
        </div>
      </div>
    </AppShell>
  );
}
