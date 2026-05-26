import React from 'react';
import Card from '../common/Card';
import CircularProgress from '../common/CircularProgress';

export default function CollectionProgress({ collected, target }) {
  const percent = target > 0 ? Math.min(Math.round((collected / target) * 100), 100) : 0;
  const remaining = Math.max(target - collected, 0);

  return (
    <Card title="Collection Progress" subtitle="Target vs Collected">
      {/* Circular Progress - using the common component */}
      <div className="flex items-center justify-center py-4">
        <CircularProgress value={percent} size="xl" />
      </div>

      {/* Progress Bar */}
      <div className="mt-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-gray-500">Progress</span>
          <span className="text-xs font-medium text-gray-500">{percent}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              percent >= 100 ? 'bg-emerald-500' : percent >= 75 ? 'bg-blue-500' : percent >= 50 ? 'bg-yellow-500' : 'bg-orange-500'
            }`}
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>

      {/* Stats Row */}
      <div className="mt-5 grid grid-cols-3 gap-4">
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">Target</p>
          <p className="text-sm font-bold text-gray-800">TSH {target?.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">Collected</p>
          <p className="text-sm font-bold text-emerald-600">TSH {collected?.toLocaleString()}</p>
        </div>
        <div className="text-center">
          <p className="text-xs text-gray-400 mb-1">Remaining</p>
          <p className="text-sm font-bold text-orange-600">TSH {remaining?.toLocaleString()}</p>
        </div>
      </div>
    </Card>
  );
}