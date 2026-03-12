import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';

const getStatusChip = (status) => {
    switch (status) {
        case 'Completed':
            return <div className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-green-500 text-white rounded-full">{status}</div>;
        case 'In Progress':
            return <div className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-yellow-500 text-white rounded-full">{status}</div>;
        default:
            return <div className="text-xs inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold bg-gray-400 text-white rounded-full">{status}</div>;
    }
}

const HistoryItem = ({ item }) => {
  return (
    <Card>
        <div className="flex justify-between items-start">
            <div>
                <p className="text-sm text-gray-500">{item.id}</p>
                <h3 className="text-xl font-bold mt-1">{item.goal}</h3>
            </div>
            {getStatusChip(item.status)}
        </div>
        <div className="mt-4 pt-4 border-t border-gray-200 flex items-center space-x-4">
            {item.status === 'Completed' && (
                <>
                    <Link to={`/results/${item.id}`} className="text-blue-600 font-semibold">Open Results</Link>
                    <Link to={`/job-config`} className="text-blue-600 font-semibold">Re-run with Changes</Link>
                </>
            )}
            {item.status === 'In Progress' && (
                <Link to={`/execution`} className="text-blue-600 font-semibold">Resume Session</Link>
            )}
        </div>
    </Card>
  );
};

export default HistoryItem;
