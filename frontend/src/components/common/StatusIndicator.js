
import React from 'react';

const statusStyles = {
  queued: 'bg-yellow-100 text-yellow-800',
  running: 'bg-blue-100 text-blue-800',
  completed: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  default: 'bg-gray-100 text-gray-800',
};

const StatusIndicator = ({ status }) => {
  const style = statusStyles[status] || statusStyles.default;

  return (
    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${style}`}>
      {status.toUpperCase()}
    </span>
  );
};

export default StatusIndicator;
