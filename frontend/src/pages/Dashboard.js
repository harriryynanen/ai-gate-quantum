import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css'; // New CSS for the dashboard layout

const Dashboard = () => {
  const activeJobs = [
    { id: 'job-123', name: 'Q-Anneal Simulation', status: 'In Progress' },
    { id: 'job-124', name: 'VQE Ground State', status: 'In Progress' },
  ];

  const recentActivity = [
    { id: 1, description: 'Job #122 completed successfully.', time: '2 hours ago' },
    { id: 2, description: 'New solver 'Hybrid Genetic Algorithm' was added.', time: '1 day ago' },
  ];

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Welcome, User</h1>
        <p>Your flight control center for quantum and classical analytics.</p>
      </div>

      <div className="quick-actions">
        <Link to="config" className="action-button">
          <span>+</span> New Job
        </Link>
        <Link to="solvers" className="action-button">
          <span>&#9881;</span> Browse Solvers
        </Link>
      </div>

      <section className="dashboard-section">
        <h2>Active Jobs</h2>
        <ul className="job-list">
          {activeJobs.map(job => (
            <li key={job.id} className="job-item">
              <span>{job.name} (ID: {job.id})</span>
              <span>{job.status}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="dashboard-section">
        <h2>Recent Activity</h2>
        <ul className="activity-list">
          {recentActivity.map(activity => (
            <li key={activity.id} className="activity-item">
              <span>{activity.description}</span>
              <span>{activity.time}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Dashboard;
