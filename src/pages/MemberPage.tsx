import { AppShell } from "../components/layout/AppShell";
import { UsersTable } from "../components/users/UsersTable";

type MemberPageProps = {
  onLogout: () => void;
  profileName: string;
};

export function MemberPage({ onLogout, profileName }: MemberPageProps) {
  return (
    <AppShell title="Users" onLogout={onLogout} profileName={profileName}>
      <UsersTable />
    </AppShell>
  );
}
