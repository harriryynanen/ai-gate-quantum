
import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    // Mock data for recent jobs
    const recentJobs = [
        { id: 'job-1678886400', solver: 'Classical Baseline', status: 'Completed', date: '3 days ago' },
        { id: 'job-1678800000', solver: "Grover's Search (Sim)", status: 'Completed', date: '4 days ago' },
        { id: 'job-1678713600', solver: 'VQE (Prototype)', status: 'Failed', date: '5 days ago' },
    ];

    return (
        <div className="dashboard-container">
            <h1>Welcome to the Quantum & AI Analytics Platform</h1>
            <p className="subtitle">Your central hub for configuring, executing, and analyzing complex computational jobs.</p>

            <div className="key-actions">
                <Link to="/job-configuration" className="action-card">
                    <h3><i className="fas fa-play-circle"></i> New Job</h3>
                    <p>Configure and launch a new computational job using classical, hybrid, or quantum solvers.</p>
                </Link>
                <Link to="/solver-registry" className="action-card">
                    <h3><i className="fas fa-cogs"></i> Solver Registry</h3>
                    <p>Explore the catalog of available solvers, understand their capabilities, and compare their strengths.</p>
                </Link>
                <Link to="/job-history" className="action-card">
                    <h3><i className="fas fa-history"></i> Job History</h3>
                    <p>Review the status and results of all your past computational jobs.</p>
                </Link>
            </div>

            <div className="recent-activity">
                <h2>Recent Activity</h2>
                <table className="activity-table">
                    <thead>
                        <tr>
                            <th>Job ID</th>
                            <th>Solver Used</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {recentJobs.map(job => (
                            <tr key={job.id}>
                                <td><span className="code-pill">{job.id}</span></td>
                                <td>{job.solver}</td>
                                <td><span className={`status-pill ${job.status.toLowerCase()}`}>{job.status}</span></td>
                                <td>{job.date}</td>
                                <td><Link to={`/results/${job.id}`}>View Results</Link></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;
