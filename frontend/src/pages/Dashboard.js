
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
    const navigate = useNavigate();
    const [recentJobs, setRecentJobs] = useState([]);

    useEffect(() => {
        // Oletamme, että kehityspalvelin on konfiguroitu proxyttamaan
        // pyynnöt backend-palvelulle (esim. localhost:8080)
        fetch('/jobs')
            .then(response => response.json())
            .then(data => setRecentJobs(data))
            .catch(error => console.error('Error fetching recent jobs:', error));
    }, []); // Tyhjä taulukko varmistaa, että efekti ajetaan vain kerran

    const handleNewAnalysis = () => {
        navigate('/job-configuration');
    };

    const getStatusBadge = (status) => {
        if (status === 'Completed') return 'badge-complete';
        if (status === 'In Progress') return 'badge-in-progress';
        return '';
    };

    const getSolverBadge = (type) => {
        if (type === 'quantum') return 'badge-quantum';
        return 'badge-classical';
    };

    return (
        <div className="dashboard-container">
            <div className="dashboard-header">
                <div className="dh-left">
                    <div className="dh-title">Dashboard</div>
                    <div className="dh-sub">Welcome back, Dr. Johansson</div>
                </div>
                <div className="dh-right">
                    <button className="new-analysis-button" onClick={handleNewAnalysis}>+ New Analysis</button>
                </div>
            </div>

            <div className="dashboard-body">
                <div className="section-head">
                    <div className="section-title">Recent Analyses</div>
                    <Link to="/history" className="section-action">View all →</Link>
                </div>
                <div className="job-table">
                    <div className="jt-head">
                        <div className="jt-hcell">Analysis</div>
                        <div className="jt-hcell">Solver</div>
                        <div className="jt-hcell">Status</div>
                        <div className="jt-hcell">Duration</div>
                        <div className="jt-hcell">Date</div>
                        <div className="jt-hcell"></div>
                    </div>
                    {recentJobs.map(job => (
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
        </div>
    );
};

export default Dashboard;
