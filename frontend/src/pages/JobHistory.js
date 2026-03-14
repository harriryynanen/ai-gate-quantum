
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './JobHistory.css';

const JobHistory = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch('/jobs')
            .then(response => response.json())
            .then(data => setJobs(data))
            .catch(error => console.error('Error fetching jobs:', error));
    }, []);

    const getStatusBadge = (status) => {
        if (status === 'Completed') return 'badge-complete';
        if (status === 'In Progress') return 'badge-in-progress';
        if (status === 'Failed') return 'badge-failed';
        return '';
    };

    const getSolverBadge = (type) => {
        if (type === 'quantum') return 'badge-quantum';
        if (type === 'hybrid') return 'badge-hybrid';
        return 'badge-classical';
    };

    return (
        <div className="job-history-container">
            <div className="dashboard-header">
                <div className="dh-title">Job History</div>
                <div className="dh-sub">All quantum and classical analyses</div>
            </div>

            <div className="job-table-full">
                <div className="jt-head">
                    <div className="jt-hcell">Analysis</div>
                    <div className="jt-hcell">Solver</div>
                    <div className="jt-hcell">Status</div>
                    <div className="jt-hcell">Duration</div>
                    <div className="jt-hcell">Date</div>
                    <div className="jt-hcell"></div>
                </div>
                {jobs.map(job => (
                    <Link to={`/results/${job.id}`} className="jt-row" key={job.id}>
                        <div>
                            <div className="jt-name">{job.name}</div>
                            <div className="jt-sub">{job.sub}</div>
                        </div>
                        <div><span className={`badge ${getSolverBadge(job.solverType)}`}>{job.solver}</span></div>
                        <div><span className={`badge ${getStatusBadge(job.status)}`}>{job.status}</span></div>
                        <div className="jt-mono">{job.duration}</div>
                        <div className="jt-cell">{job.date}</div>
                        <div><button className="ds-action">Open</button></div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default JobHistory;
