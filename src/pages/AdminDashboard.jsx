import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import AppShell from '../components/layout/AppShell';
import StatCards from '../components/dashboard/StatCards';
import RecordPaymentForm from '../components/dashboard/RecordPaymentForm';
import AddMemberForm from '../components/dashboard/AddMemberForm';
import MemberStatusTable from '../components/dashboard/MemberStatusTable';
import CollectionProgress from '../components/dashboard/CollectionProgress';
import ActivityFeed from '../components/dashboard/ActivityFeed';
import { useToast } from '../components/common/Toast';

const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export default function AdminDashboard({ user, onLogout }) {
  const toast = useToast();
  const [members, setMembers] = useState([]);
  const [target, setTarget] = useState(130000);
  const [activities, setActivities] = useState([]);
  const [activeNav, setActiveNav] = useState('dashboard');
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);
  const [pageError, setPageError] = useState(null);
  const [selectedMember, setSelectedMember] = useState(null);
  const fetchIdRef = useRef(0);
  const abortRef = useRef(null);

  // Fetch all data from API
  const fetchData = useCallback(async () => {
    if (abortRef.current) abortRef.current.abort();
    const controller = new AbortController();
    abortRef.current = controller;
    const fetchId = ++fetchIdRef.current;

    setPageError(null);
    setPageLoading(true);
    try {
      const [membersRes, statsRes, activityRes] = await Promise.all([
        fetch(`${API}/api/members/`, { signal: controller.signal }),
        fetch(`${API}/api/stats`, { signal: controller.signal }),
        fetch(`${API}/api/activity`, { signal: controller.signal }),
      ]);

      if (fetchId !== fetchIdRef.current) return;

      if (!membersRes.ok || !statsRes.ok || !activityRes.ok) {
        throw new Error(`Server returned ${membersRes.status}, ${statsRes.status}, ${activityRes.status}`);
      }

      const membersData = await membersRes.json();
      const statsData = await statsRes.json();
      const activityData = await activityRes.json();

      setMembers(membersData);
      setTarget(statsData.target);
      setActivities(activityData);
      setPageError(null);
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error('Failed to fetch data:', err);
      setPageError(`Could not connect to server at ${API}. Make sure the backend is running.`);
    } finally {
      if (fetchId === fetchIdRef.current) setPageLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
    return () => { if (abortRef.current) abortRef.current.abort(); };
  }, [fetchData]);

  const stats = useMemo(() => {
    const totalMembers = members.length;
    const activeMembers = members.filter((m) => (m.total_paid || 0) > 0).length;
    const totalCollected = members.reduce((sum, m) => sum + (m.total_paid || 0), 0);
    const totalTarget = totalMembers * target;
    const totalRemaining = members.reduce((sum, m) => sum + Math.max(0, target - (m.total_paid || 0)), 0);
    const paidMembers = members.filter((m) => (m.total_paid || 0) >= target).length;
    const unpaidMembers = members.filter((m) => !m.total_paid || m.total_paid === 0).length;
    const progressPercent = totalTarget > 0 ? Math.min(Math.round((totalCollected / totalTarget) * 100), 100) : 0;

    return { totalMembers, activeMembers, totalCollected, totalRemaining, paidMembers, unpaidMembers, progressPercent, target };
  }, [members, target]);

  const handleAddMember = async (data) => {
    try {
      const res = await fetch(`${API}/api/members/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const err = await res.json();
        toast.addToast(err.detail || 'Failed to add member', 'error');
        return;
      }

      await fetchData();
      toast.addToast(`${data.name} has been added successfully`, 'success');
    } catch (err) {
      console.error('Failed to add member:', err);
      toast.addToast('Network error: could not add member. Is the backend running?', 'error');
    }
  };

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
        toast.addToast(err.detail || 'Failed to record payment', 'error');
        return;
      }

      await fetchData();
      toast.addToast('Payment recorded successfully', 'success');
    } catch (err) {
      console.error('Failed to record payment:', err);
      toast.addToast('Network error: could not record payment. Is the backend running?', 'error');
    }
    setLoading(false);
  };

  const handleDeleteMember = async (id) => {
    try {
      const res = await fetch(`${API}/api/members/${id}`, { method: 'DELETE' });

      if (!res.ok) {
        toast.addToast('Failed to delete member', 'error');
        return;
      }

      await fetchData();
      toast.addToast('Member removed successfully', 'success');
    } catch (err) {
      console.error('Failed to delete member:', err);
      toast.addToast('Network error: could not delete member. Is the backend running?', 'error');
    }
  };

  const handleViewHistory = (member) => {
    setSelectedMember(member);
    setActiveNav('members');
  };

  const handleUpdateTarget = async (newTarget) => {
    try {
      const res = await fetch(`${API}/api/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: 'target', value: String(newTarget) }),
      });
      if (!res.ok) throw new Error('Failed to update target');
      await fetchData();
      toast.addToast(`Target updated to TSH ${Number(newTarget).toLocaleString()}`, 'success');
    } catch (err) {
      console.error('Failed to update target:', err);
      toast.addToast('Network error: could not update target. Is the backend running?', 'error');
      await fetchData();
    }
  };

  const existingNames = members.map((m) => m.name);

  const adaptedMembers = members.map((m) => ({
    id: m.id,
    name: m.name,
    phone: m.phone,
    totalPaid: m.total_paid || 0,
    remaining: Math.max(0, target - (m.total_paid || 0)),
  }));

  const renderContent = () => {
    if (pageLoading) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm text-gray-500">Loading data...</p>
          </div>
        </div>
      );
    }

    if (pageError) {
      return (
        <div className="flex items-center justify-center py-20">
          <div className="text-center max-w-md">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-50 flex items-center justify-center">
              <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Connection Error</h3>
            <p className="text-sm text-gray-500 mb-4">{pageError}</p>
            <button
              onClick={fetchData}
              className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      );
    }

    switch (activeNav) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <StatCards stats={stats} />
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <MemberStatusTable members={adaptedMembers} onViewHistory={handleViewHistory} onDelete={handleDeleteMember} />
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
            <MemberStatusTable members={adaptedMembers} onViewHistory={handleViewHistory} onDelete={handleDeleteMember} />
            {selectedMember && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-800">Payment History — {selectedMember.name}</h3>
                  <button onClick={() => setSelectedMember(null)} className="text-xs text-gray-400 hover:text-gray-600">Close</button>
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
            <RecordPaymentForm members={adaptedMembers} onSubmit={handleRecordPayment} loading={loading} />
          </div>
        );

      case 'add-member':
        return (
          <div className="max-w-lg">
            <AddMemberForm existingNames={existingNames} onSubmit={handleAddMember} />
          </div>
        );

      case 'reports':
        return (
          <div className="space-y-6">
            <StatCards stats={stats} />
            <CollectionProgress collected={stats.totalCollected} target={target} />
            <MemberStatusTable members={adaptedMembers} onViewHistory={handleViewHistory} onDelete={handleDeleteMember} />
          </div>
        );

      case 'settings':
        return (
          <div className="max-w-lg">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-4">Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Target Amount (TSH)</label>
                  <input
                    type="number"
                    value={target}
                    onChange={(e) => handleUpdateTarget(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  />
                </div>
                <p className="text-xs text-gray-400">Changing the target will recalculate each member's remaining balance.</p>
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
