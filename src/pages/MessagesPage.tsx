import { AppShell } from "../components/layout/AppShell";
import { ChatPanel } from "../components/messages/ChatPanel";
import { ConversationList } from "../components/messages/ConversationList";
import { UserInfoPanel } from "../components/messages/UserInfoPanel";

type MessagesPageProps = {
  onLogout: () => void;
  profileName: string;
};

export function MessagesPage({ onLogout, profileName }: MessagesPageProps) {
  return (
    <AppShell title="Messages" onLogout={onLogout} profileName={profileName}>
      <section className="grid gap-0 overflow-hidden rounded-lg border border-slate-200 bg-white lg:grid-cols-12">
        <ConversationList />
        <ChatPanel />
        <UserInfoPanel />
      </section>
    </AppShell>
  );
}
