
import React from 'react';
import { Link } from 'react-router-dom';
import StatusIndicator from '../common/StatusIndicator';

const JobListItem = ({ session }) => {
    const formattedTimestamp = session.createdAt?.toDate ? 
        session.createdAt.toDate().toLocaleString() : 
        'No date available';

    // The link should ideally go to the correct page based on session status
    const getSessionUrl = (session) => {
        if(session.status === 'completed' || session.status === 'running') {
            return `/results?session=${session.id}`
        }
        return `/job-configuration?session=${session.id}`
    }

    return (
        <Link to={getSessionUrl(session)} className="block p-4 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 transition-colors duration-200">
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold text-gray-900 text-lg">{session.title || 'Untitled Session'}</p>
                    <p className="text-sm text-gray-500">Session ID: {session.id}</p>
                    <p className="text-sm text-gray-500">Created: {formattedTimestamp}</p>
                </div>
                <div className="flex items-center">
                    {session.status && <StatusIndicator status={session.status} />}
                </div>
            </div>
        </Link>
    );
};

export default JobListItem;
