import React from 'react';

const ExecutionTimeline = ({ stages, currentStage }) => {
    if (!stages) {
        return <p>No stages defined.</p>;
    }
    return (
        <div>
            <h2>Execution Timeline</h2>
            <p>Current Stage: {currentStage}</p>
        </div>
    );
};

export default ExecutionTimeline;
