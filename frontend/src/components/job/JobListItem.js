import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from './common/StatusBadge';

const JobListItem = ({ job }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #eee' }}>
      <div>
        <Link to={`/results/${job.id}`}>{job.name}</Link>
        <div style={{ fontSize: '0.8em', color: '#666' }}>{new Date(job.createdAt).toLocaleString()}</div>
      </div>
      <StatusBadge status={job.status} />
    </div>
  );
};

export default JobListItem;
