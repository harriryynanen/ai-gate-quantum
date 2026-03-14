import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import './Dashboard.css'; // We will create this file

// Let's create a reusable StatCard component right here for simplicity
const StatCard = ({ title, value, change, changeType }) => (
  <div className="stat-card">
    <p className="stat-title">{title}</p>
    <p className="stat-value">{value}</p>
    {change && (
      <p className={`stat-change ${changeType === 'increase' ? 'increase' : 'decrease'}`}>
        {change}
      </p>
    )}
  </div>
);

// A more structured list item for recent jobs
const RecentJobRow = ({ job }) => (
    <div className="recent-job-row">
        <div className="job-info">
            <p className="job-name">{job.name}</p>
            <p className="job-id">ID: {job.id}</p>
        </div>
        <div className="job-status">
            <span className={`badge badge-${job.status === 'Complete' ? 'complete' : 'in-progress'}`}>{job.status}</span>
            <span className="job-time">- {job.time}</span>
        </div>
        <Link to={`/results?job=${job.id}`} className="job-link">
            <ArrowRightIcon className="h-5 w-5" />
        </Link>
    </div>
);

const Dashboard = () => {
  const stats = [
    { title: 'Total Jobs Run', value: 78, change: '+12% vs last month' },
    { title: 'Success Rate', value: '92%', change: '+1.5% vs last month' },
    { title: 'Average QPU Time', value: '3.4s', change: '-0.2s vs last month', changeType: 'decrease' },
    { title: 'New Solvers Available', value: 3 },
  ];

  const recentJobs = [
    { id: 'job-456', name: 'Portfolio Optimization', status: 'Complete', time: '3h ago' },
    { id: 'job-455', name: 'Drug Discovery Simulation', status: 'Complete', time: '8h ago' },
    { id: 'job-454', name: 'Quantum Chemistry Analysis', status: 'In Progress', time: '1d ago' },
  ];

  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1 className="display-title">Dashboard</h1>
        <p className="subtitle">Welcome back. Here's a snapshot of your recent activity.</p>
      </header>

      <section className="stats-grid">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </section>

      <section className="recent-jobs-section">
        <header className="section-header">
          <h2 className="section-title">Recent Jobs</h2>
          <Link to="/history" className="btn btn-secondary">View All</Link>
        </header>
        <div className="recent-jobs-list">
            {recentJobs.map(job => <RecentJobRow key={job.id} job={job} />)}
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
