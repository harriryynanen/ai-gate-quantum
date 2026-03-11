import React from 'react';

const StatusBadge = ({ status }) => {
  const style = {
    padding: '5px 10px',
    borderRadius: '12px',
    color: 'white',
    fontSize: '0.9em',
    fontWeight: 'bold',
  };

  let backgroundColor;

  switch (status) {
    case 'succeeded':
      backgroundColor = '#4caf50'; // Green
      break;
    case 'running':
      backgroundColor = '#2196f3'; // Blue
      break;
    case 'failed':
      backgroundColor = '#f44336'; // Red
      break;
    default:
      backgroundColor = '#9e9e9e'; // Grey
  }

  return <span style={{ ...style, backgroundColor }}>{status}</span>;
};

export default StatusBadge;
