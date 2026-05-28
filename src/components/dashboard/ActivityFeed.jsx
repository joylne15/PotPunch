import React from 'react';
import Card from '../common/Card';

const activityIcons = {
  payment: (
    <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center">
      <svg className="w-4 h-4 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    </div>
  ),
  member_added: (
    <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center">
      <svg className="w-4 h-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
    </div>
  ),
  member_deleted: (
    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center">
      <svg className="w-4 h-4 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M13 7a4 4 0 01-4 4H5m8-4a4 4 0 00-4 4M5 11h4m0 0v6m0-6H5m8 0v6m0-6h4" />
      </svg>
    </div>
  ),
  target_updated: (
    <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center">
      <svg className="w-4 h-4 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    </div>
  ),
};

export default function ActivityFeed({ activities = [] }) {
  const formatTimeAgo = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card title="Recent Activity" subtitle="Latest actions" noPadding>
      {activities.length === 0 ? (
        <div className="px-5 py-10 text-center text-sm text-gray-400">
          No recent activity
        </div>
      ) : (
        <div className="divide-y divide-gray-50">
          {activities.map((activity, index) => (
            <div
              key={index}
              className="flex items-start gap-3 px-5 py-3.5 hover:bg-gray-50 transition-colors duration-100"
            >
              <div className=" mt-0.5">
                {activityIcons[activity.type] || activityIcons.payment}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-gray-800">
                  <span className="font-medium">{activity.memberName}</span>
                  {activity.type === 'payment' && (
                    <span className="text-gray-500"> paid </span>
                  )}
                  {activity.type === 'payment' && (
                    <span className="font-semibold text-emerald-600">
                   TSH {activity.amount?.toLocaleString()}
                    </span>
                  )}
                  {activity.type === 'member_added' && (
                    <span className="text-gray-500"> was added as a member</span>
                  )}
                  {activity.type === 'member_deleted' && (
                    <span className="text-gray-500"> was removed</span>
                  )}
                  {activity.type === 'target_updated' && (
                    <span className="text-gray-500"> target updated to </span>
                  )}
                  {activity.type === 'target_updated' && (
                    <span className="font-semibold text-purple-600">
                      TSH {activity.amount?.toLocaleString()}
                    </span>
                  )}
                </p>
                {activity.note && (
                  <p className="text-xs text-gray-400 mt-0.5 truncate">{activity.note}</p>
                )}
              </div>
              <span className="text-xs text-gray-400">
                {formatTimeAgo(activity.date)}
              </span>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}