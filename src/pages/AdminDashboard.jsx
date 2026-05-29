import React, { useState, useEffect, useMemo } from 'react';
import AppShell from '../components/layout/AppShell';
import StatCards from '../components/dashboard/StatCards';
import RecordPaymentForm from '../components/dashboard/RecordPaymentForm';
import AddMemberForm from '../components/dashboard/AddMemberForm';
import MemberStatusTable from '../components/dashboard/MemberStatusTable';
import CollectionProgress from '../components/dashboard/CollectionProgress';
import ActivityFeed from '../components/dashboard/ActivityFeed';

const API = 'http://localhost:8000';

export default function AdminDashboard({ user, onLogout }) {
  const [members, setMembers] = useState([]);
  const [target, setTarget] = useState(130000);
  const [activities, setActivities] = useState([]);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);

  // Fetch all data from API
  const fetchData = async () => {
    try {
      const [membersRes, statsRes, activityRes] = await Promise.all([
        fetch(`${API}/api/members/`),
        fetch(`${API}/api/stats`),
        fetch(`${API}/api/activity`),
      ]);

      const membersData = await membersRes.json();
      const statsData = await statsRes.json();
      const activityData = await activityRes.json();

      setMembers(membersData);
      setTarget(statsData.target);
      setActivities(activityData);
    } catch (err) {
      console.error('Failed to fetch data:', err);
    }
  };

  // Load data on mount
  useEffect(() => {
    fetchData();
  }, []);

  // Calculate stats from members + target
  const stats = useMemo(() => {
    const totalMembers = members.length;
    const activeMembers = members.filter((m) => m.total_paid > 0).length;
    const totalCollected = members.reduce((sum, m) => sum + m.total_paid, 0);
    const totalRemaining = members.reduce((sum, m) => sum + m.remaining, 0);
    const paidMembers = members.filter((m) => m.remaining <= 0).length;
    const unpaidMembers = members.filter((m) => m.total_paid === 0).length;
    const progressPercent = target > 0 ? Math.min(Math.round((totalCollected / target) * 100), 100) : 0;

    return { totalMembers, activeMembers, totalCollected, totalRemaining, paidMembers, unpaidMembers, progressPercent, target };
  }, [members, target]);

  // Add member via API
  const handleAddMember = async (data) => {
    try {
      const res = await fetch(`${API}/api/members/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.detail || 'Failed to add member');
        return;
      }

      fetchData();
    } catch (err) {
      console.error('Failed to add member:', err);
    }
  };

  // Record payment via API
  const handleRecordPayment = async (data) => {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/members/${data.memberId}/payment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ member_id: data.memberId, amount: data.amount, note: data.note }),
      });

      if (!res.ok) {
        const err = await res.json();
        alert(err.detail || 'Failed to record payment');
        return;
      }

      fetchData();
    } catch (err) {
      console.error('Failed to record payment:', err);
    }
    setLoading(false);
  };

  // Delete member via API
  const handleDeleteMember = async (id) => {
    try {
      const res = await fetch(`${API}/api/members/${id}`, { method: 'DELETE' });

      if (!res.ok) {
        alert('Failed to delete member');
        return;
      }

      fetchData();
    } catch (err) {
      console.error('Failed to delete member:', err);
    }
  };

  // View member history
  const handleViewHistory = (member) => {
    setSelectedMember(member);
    setActiveNav('members');
  };

  // Update target via API
  const handleUpdateTarget = async (newTarget) => {
    setTarget(newTarget);
    try {
      await fetch(`${API}/api/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'target', value: String(newTarget) }),
      });
      fetchData();
    } catch (err) {
      console.error('Failed to update target:', err);
    }
  };

  // Existing member names for duplicate check
  const existingNames = members.map((m) => m.name);

  // Adapt members for components (API uses snake_case)
  const adaptedMembers = members.map((m) => ({
    id: m.id,
    name: m.name,
    phone: m.phone,
    totalPaid: m.total_paid,
    remaining: m.remaining,
  }));

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
                  members={adaptedMembers}
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
              members={adaptedMembers}
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
                </div>
              </div>
            )}
          </div>
        );

      case 'record-payment':
        return (
          <div className="max-w-lg">
            <RecordPaymentForm
              members={adaptedMembers}
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
              members={adaptedMembers}
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
                    Target Amount (TSH)
                  </label>
                  <input
                    type="number"
                    value={target}
                    onChange={(e) => handleUpdateTarget(Number(e.target.value))}
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