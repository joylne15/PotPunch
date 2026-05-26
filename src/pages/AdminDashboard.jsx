import React, { useState, useMemo } from 'react';
import AppShell from '../components/layout/AppShell';
import StatCards from '../components/dashboard/StartCards';
import RecordPaymentForm from '../components/dashboard/RecordPaymentForm';
import AddMemberForm from '../components/dashboard/AddMemberForm';
import MemberStatusTable from '../components/dashboard/MemberStatusTable';
import CollectionProgress from '../components/dashboard/CollectionProgress';
import ActivityFeed from '../components/dashboard/ActivityFeed';

const INITIAL_MEMBERS = [
  { id: 1, name: 'Alice Wanjiku', phone: '+254 712 345 678', totalPaid: 10000, remaining: 3000 },
  { id: 2, name: 'Brian Odhiambo', phone: '+254 723 456 789', totalPaid: 13000, remaining: 0 },
  { id: 3, name: 'Charity Achieng', phone: '+254 734 567 890', totalPaid: 5000, remaining: 8000 },
  { id: 4, name: 'David Kamau', phone: '+254 745 678 901', totalPaid: 0, remaining: 13000 },
  { id: 5, name: 'Esther Njoroge', phone: '+254 756 789 012', totalPaid: 8000, remaining: 5000 },
  { id: 6, name: 'Francis Mwangi', phone: '+254 767 890 123', totalPaid: 11000, remaining: 2000 },
  { id: 7, name: 'Grace Wambui', phone: '+254 778 901 234', totalPaid: 13000, remaining: 0 },
  { id: 8, name: 'Henry Kiprop', phone: '+254 789 012 345', totalPaid: 2000, remaining: 11000 },
];

const INITIAL_TARGET = 130000;

export default function AdminDashboard({ user, onLogout }) {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [target, setTarget] = useState(INITIAL_TARGET);
  const [activities, setActivities] = useState([
    { type: 'payment', memberName: 'Grace Wambui', amount: 13000, date: new Date(Date.now() - 1800000).toISOString(), note: 'Full payment' },
    { type: 'payment', memberName: 'Francis Mwangi', amount: 5000, date: new Date(Date.now() - 7200000).toISOString(), note: 'Monthly contribution' },
    { type: 'member_added', memberName: 'Henry Kiprop', date: new Date(Date.now() - 86400000).toISOString() },
    { type: 'payment', memberName: 'Brian Odhiambo', amount: 13000, date: new Date(Date.now() - 172800000).toISOString(), note: 'Full settlement' },
    { type: 'target_updated', memberName: 'System', amount: 130000, date: new Date(Date.now() - 259200000).toISOString(), note: 'Target set for this cycle' },
  ]);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Calculate stats
  const stats = useMemo(() => {
    const totalMembers = members.length;
    const activeMembers = members.filter((m) => m.totalPaid > 0).length;
    const totalCollected = members.reduce((sum, m) => sum + m.totalPaid, 0);
    const totalRemaining = members.reduce((sum, m) => sum + m.remaining, 0);
    const paidMembers = members.filter((m) => m.remaining <= 0).length;
    const unpaidMembers = members.filter((m) => m.totalPaid === 0).length;
    const progressPercent = target > 0 ? Math.min(Math.round((totalCollected / target) * 100), 100) : 0;

    return { totalMembers, activeMembers, totalCollected, totalRemaining, paidMembers, unpaidMembers, progressPercent, target };
  }, [members, target]);

  // Add member
  const handleAddMember = (data) => {
    const newMember = {
      id: Date.now(),
      name: data.name,
      phone: data.phone,
      totalPaid: 0,
      remaining: target / Math.max(members.length + 1, 1),
    };

    // Recalculate remaining for all members based on new target split
    const perMember = Math.ceil(target / (members.length + 1));
    setMembers((prev) => [
      ...prev.map((m) => ({ ...m, remaining: Math.max(perMember - m.totalPaid, 0) })),
      { ...newMember, remaining: perMember },
    ]);

    setActivities((prev) => [
      { type: 'member_added', memberName: data.name, date: new Date().toISOString() },
      ...prev,
    ]);
  };

  // Record payment
  const handleRecordPayment = (data) => {
    setLoading(true);
    setTimeout(() => {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === data.memberId
            ? { ...m, totalPaid: m.totalPaid + data.amount, remaining: Math.max(m.remaining - data.amount, 0) }
            : m
        )
      );

      const member = members.find((m) => m.id === data.memberId);
      setActivities((prev) => [
        { type: 'payment', memberName: member?.name || 'Unknown', amount: data.amount, date: new Date().toISOString(), note: data.note },
        ...prev,
      ]);

      setLoading(false);
    }, 500);
  };

  // Delete member
  const handleDeleteMember = (id) => {
    const member = members.find((m) => m.id === id);
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setActivities((prev) => [
      { type: 'member_deleted', memberName: member?.name || 'Unknown', date: new Date().toISOString() },
      ...prev,
    ]);
  };

  // View member history
  const handleViewHistory = (member) => {
    setSelectedMember(member);
    setActiveNav('members');
  };

  // Existing member names for duplicate check
  const existingNames = members.map((m) => m.name);

  // Render content based on active nav
  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <StatCards stats={stats} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MemberStatusTable
                  members={members}
                  onViewHistory={handleViewHistory}
                  onDelete={handleDeleteMember}
                />
              </div>
              <div className="space-y-6">
                <CollectionProgress collected={stats.totalCollected} target={target} />
                <ActivityFeed activities={activities.slice(0, 5)} />
              </div>
            </div>
          </div>
        );

      case 'members':
        return (
          <div className="space-y-6">
            <MemberStatusTable
              members={members}
              onViewHistory={handleViewHistory}
              onDelete={handleDeleteMember}
            />
            {selectedMember && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-800">
                    Payment History — {selectedMember.name}
                  </h3>
                  <button
                    onClick={() => setSelectedMember(null)}
                    className="text-xs text-gray-400 hover:text-gray-600"
                  >
                    Close
                  </button>
                </div>
                <div className="bg-gray-50 rounded-lg p-4 text-sm text-gray-600">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-400">Total Paid</p>
                      <p className="font-semibold text-emerald-600">TSH {selectedMember.totalPaid?.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Remaining</p>
                      <p className="font-semibold text-orange-600">TSH {selectedMember.remaining?.toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-3">
                    Full payment history will be available when backend is connected.
                  </p>
                </div>
              </div>
            )}
          </div>
        );

      case 'record-payment':
        return (
          <div className="max-w-lg">
            <RecordPaymentForm
              members={members}
              onSubmit={handleRecordPayment}
              loading={loading}
            />
          </div>
        );

      case 'add-member':
        return (
          <div className="max-w-lg">
            <AddMemberForm
              existingNames={existingNames}
              onSubmit={handleAddMember}
            />
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <StatCards stats={stats} />
            <CollectionProgress collected={stats.totalCollected} target={target} />
            <MemberStatusTable
              members={members}
              onViewHistory={handleViewHistory}
              onDelete={handleDeleteMember}
            />
          </div>
        );

      case 'settings':
        return (
          <div className="max-w-lg">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Target Amount (KSH)
                  </label>
                  <input
                    type="number"
                    value={target}
                    onChange={(e) => {
                      const newTarget = Number(e.target.value);
                      setTarget(newTarget);
                      const perMember = Math.ceil(newTarget / members.length);
                      setMembers((prev) =>
                        prev.map((m) => ({ ...m, remaining: Math.max(perMember - m.totalPaid, 0) }))
                      );
                      setActivities((prev) => [
                        { type: 'target_updated', memberName: 'System', amount: newTarget, date: new Date().toISOString() },
                        ...prev,
                      ]);
                    }}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <p className="text-xs text-gray-400">
                  Changing the target will recalculate each member's remaining balance.
                </p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <AppShell user={user} activeNav={activeNav} onNavChange={setActiveNav} onLogout={onLogout}>
      {renderContent()}
    </AppShell>
  );
}