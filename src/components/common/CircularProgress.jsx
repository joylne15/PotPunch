import React from 'react';

export default function CircularProgress({ value, size = 'md', showLabel = true }) {
  const sizes = {
    sm: { container: 'w-10 h-10', text: 'text-xs', strokeWidth: 6 },
    md: { container: 'w-16 h-16', text: 'text-sm', strokeWidth: 5 },
    lg: { container: 'w-24 h-24', text: 'text-lg', strokeWidth: 4 },
    xl: { container: 'w-36 h-36', text: 'text-2xl', strokeWidth: 3.5 },
  };

  const config = sizes[size] || sizes.md;
  const radius = 50 - config.strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const getColor = () => {
    if (value >= 100) return { stroke: '#10b981', text: 'text-emerald-600' };
    if (value >= 75) return { stroke: '#3b82f6', text: 'text-blue-600' };
    if (value >= 50) return { stroke: '#eab308', text: 'text-yellow-600' };
    return { stroke: '#f97316', text: 'text-orange-600' };
  };

  const color = getColor();

  return (
    <div className={`relative inline-flex items-center justify-center ${config.container}`}>
      <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
        {/* Background circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="#f1f5f9"
          strokeWidth={config.strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke={color.stroke}
          strokeWidth={config.strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`font-bold ${config.text} ${color.text}`}>
            {Math.round(value)}%
          </span>
        </div>
      )}
    </div>
  );
}