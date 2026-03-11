import React from 'react';
import PropTypes from 'prop-types';

const StatusBadge = ({ status }) => {
  const statusColors = {
    pending: '#f0ad4e',
    running: '#5bc0de',
    succeeded: '#5cb85c',
    failed: '#d9534f',
  };

  const style = {
    display: 'inline-block',
    padding: '0.25em 0.6em',
    fontSize: '75%',
    fontWeight: '700',
    lineHeight: '1',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    verticalAlign: 'baseline',
    borderRadius: '0.25rem',
    color: '#fff',
    backgroundColor: statusColors[status] || '#777',
  };

  return <span style={style}>{status}</span>;
};

StatusBadge.propTypes = {
  status: PropTypes.oneOf(['pending', 'running', 'succeeded', 'failed']).isRequired,
};

export default StatusBadge;
