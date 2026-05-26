import React, { useState } from 'react';
import Card from '../common/Card';
import StatusBadge from '../common/StatusBadge';
import Button from '../common/Button';

export default function MemberStatusTable({ members, onViewHistory, onDelete }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);

  const getStatus = (member) => {
    if (member.remaining <= 0) return 'paid';
    if (member.totalPaid > 0) return 'partial';
    return 'unpaid';
  };

  const filteredMembers = members.filter((m) => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase());
    const status = getStatus(m);
    const matchesFilter = filterStatus === 'all' || status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const handleDeleteConfirm = (id) => {
    onDelete(id);
    setConfirmDeleteId(null);
  };

  const statusCounts = {
    all: members.length,
    paid: members.filter((m) => m.remaining <= 0).length,
    partial: members.filter((m) => m.totalPaid > 0 && m.remaining > 0).length,
    unpaid: members.filter((m) => m.totalPaid === 0).length,
  };

  return (
    <Card
      title="Member Status"
      subtitle={`${members.length} total members`}
      noPadding
    >
      {/* Filters */}
      <div className="px-5 pt-4 pb-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          {['all', 'paid', 'partial', 'unpaid'].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors duration-150 ${
                filterStatus === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)} ({statusCounts[status]})
            </button>
          ))}
        </div>

        <input
          type="text"
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 rounded-lg border border-gray-300 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-200 w-full sm:w-56"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-y border-gray-100">
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">Member</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">Total Paid</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">Remaining</th>
              <th className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">Status</th>
              <th className="text-right text-xs font-semibold text-gray-500 uppercase tracking-wide px-5 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredMembers.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-10 text-gray-400 text-sm">
                  No members found
                </td>
              </tr>
            ) : (
              filteredMembers.map((member) => (
                <tr
                  key={member.id}
                  className="border-b border-gray-50 hover:bg-gray-50 transition-colors duration-100"
                >
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                        {member.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">{member.name}</p>
                        {member.phone && <p className="text-xs text-gray-400">{member.phone}</p>}
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-700 font-medium">
                    KSH {member.totalPaid?.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5 text-sm text-gray-700 font-medium">
                    KSH {member.remaining?.toLocaleString()}
                  </td>
                  <td className="px-5 py-3.5">
                    <StatusBadge status={getStatus(member)} />
                  </td>
                  <td className="px-5 py-3.5 text-right">
                    {confirmDeleteId === member.id ? (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleDeleteConfirm(member.id)}
                          className="text-xs font-medium text-red-600 hover:text-red-700"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(null)}
                          className="text-xs font-medium text-gray-500 hover:text-gray-700"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => onViewHistory(member)}
                          className="text-xs font-medium text-blue-600 hover:text-blue-700"
                        >
                          History
                        </button>
                        <button
                          onClick={() => setConfirmDeleteId(member.id)}
                          className="text-xs font-medium text-red-500 hover:text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </Card>
  );
}