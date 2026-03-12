import React from 'react';
import { Link } from 'react-router-dom';
import StatusBadge from '../common/StatusBadge';

const JobListItem = ({ job }) => {
  const formattedTimestamp = job.timestamp ? new Date(job.timestamp).toLocaleString() : 'N/A';

  return (
    <Link to={`/results/${job.id}`} className="block p-4 rounded-lg bg-white hover:bg-gray-50 border border-gray-200">
        <div className="flex justify-between items-center">
            <div>
                <p className="font-semibold text-gray-800">{job.name}</p>
                <p className="text-sm text-gray-500">Session ID: {job.id}</p>
                <p className="text-sm text-gray-500">{formattedTimestamp}</p>
            </div>
            <StatusBadge status={job.status} />
        </div>
    </Link>
  );
};

export default JobListItem;
