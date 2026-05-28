import React, { useState, useMemo } from 'react';
import AppShell from '../components/layout/AppShell';
import CircularProgress from '../components/common/CircularProgress';
import StatusBadge from '../components/common/StatusBadge';
import Card from '../components/common/Card';

export default function MemberDashboard({ user, onLogout }) {
  // Sample member data — will come from backend later
  const [memberData] = useState({
    name: user?.name || 'John Doe',
    phone: '+254 712 345 678',
    totalPaid: 8500,
    target: 13000,
    remaining: 4500,
    payments: [
      { id: 1, amount: 2000, date: '2026-05-20', note: 'Monthly contribution' },
      { id: 2, amount: 3000, date: '2026-05-10', note: 'Top up payment' },
      { id: 3, amount: 1500, date: '2026-04-28', note: 'Weekly contribution' },
      { id: 4, amount: 2000, date: '2026-04-15', note: 'Monthly contribution' },
    ],
  });

  const [activeNav, setActiveNav] = useState('dashboard');

  const status = useMemo(() => {
    if (memberData.remaining <= 0) return 'paid';
    if (memberData.totalPaid > 0) return 'partial';
    return 'unpaid';
  }, [memberData]);

  const progressPercent = useMemo(() => {
    return memberData.target > 0
      ? Math.min(Math.round((memberData.totalPaid / memberData.target) * 100), 100)
      : 0;
  }, [memberData]);

  const navItems = [
    { key: 'dashboard', label: 'Dashboard', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1" />
      </svg>
    )},
    { key: 'history', label: 'Payment History', icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    )},
  ];

  const renderContent = () => {
    switch (activeNav) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            {/* Welcome + Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    Welcome, {memberData.name}
                  </h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Here's your contribution overview
                  </p>
                </div>
                <StatusBadge status={status} size="lg" />
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Paid</p>
                <p className="text-2xl font-bold text-emerald-600 mt-2">TSH {memberData.totalPaid?.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Remaining</p>
                <p className="text-2xl font-bold text-orange-600 mt-2">TSH {memberData.remaining?.toLocaleString()}</p>
              </div>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Target</p>
                <p className="text-2xl font-bold text-gray-800 mt-2">TSH {memberData.target?.toLocaleString()}</p>
              </div>
            </div>

            {/* Progress + Recent Payments */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card title="Your Progress">
                <div className="flex items-center justify-center py-4">
                  <CircularProgress value={progressPercent} size="xl" />
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs font-medium text-gray-600">{progressPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        progressPercent >= 100 ? 'bg-emerald-500' : progressPercent >= 50 ? 'bg-blue-500' : 'bg-orange-500'
                      }`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>
                </div>
              </Card>

              <Card title="Recent Payments" subtitle="Last 3 payments">
                <div className="space-y-3">
                  {memberData.payments.slice(0, 3).map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div>
                        <p className="text-sm font-medium text-gray-800">
                          KSH {payment.amount?.toLocaleString()}
                        </p>
                        <p className="text-xs text-gray-400">{payment.note}</p>
                      </div>
                      <span className="text-xs text-gray-400">
                        {new Date(payment.date).toLocaleDateString()}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        );

      case 'history':
        return (
          <div className="space-y-6">
            <Card title="Payment History" subtitle="All your contributions">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-y border-gray-100">
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">Date</th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">Amount</th>
                      <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">Note</th>
                    </tr>
                  </thead>
                  <tbody>
                    {memberData.payments.map((payment) => (
                      <tr key={payment.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                        <td className="px-5 py-3.5 text-sm text-gray-700">
                          {new Date(payment.date).toLocaleDateString()}
                        </td>
                        <td className="px-5 py-3.5 text-sm font-medium text-emerald-600">
                          KSH {payment.amount?.toLocaleString()}
                        </td>
                        <td className="px-5 py-3.5 text-sm text-gray-500">
                          {payment.note}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Total */}
              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-700">Total Paid</span>
                <span className="text-sm font-bold text-emerald-600">
                  KSH {memberData.totalPaid?.toLocaleString()}
                </span>
              </div>
            </Card>
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