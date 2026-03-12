import React from 'react';

const JobStatus = ({ status, stageName }) => {
    if (!status) {
        return <p>No status available.</p>;
    }
    return (
        <div>
            <h2>Job Status</h2>
            <p>Status: {status}</p>
            <p>Stage: {stageName}</p>
        </div>
    );
};

export default JobStatus;
