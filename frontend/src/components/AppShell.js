import React from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';
import './AppShell.css'; 

const AppLink = ({ to, children }) => (
  <NavLink 
    to={to} 
    className={({ isActive }) => 
      `app-link ${isActive ? 'active' : ''}`
    }
  >
    {children}
  </NavLink>
);

const AppShell = () => {
  const inProgressJobs = [];

  const completedJobs = [];

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="logo">
          <span className="logo-main">QuantumFlow</span>
          <span className="logo-sub">AI-Assisted Analytics</span>
        </div>
        <nav className="top-nav">
          <AppLink to="/">Dashboard</AppLink>
          <AppLink to="/data">Data</AppLink>
          <AppLink to="/history">Job History</AppLink>
          <AppLink to="/solvers">Solvers</AppLink>
        </nav>
        <div className="user-menu">
          <div className="user-avatar"></div>
        </div>
      </header>
      <div className="app-body">
        <nav className="left-sidebar">
            <div className="sidebar-section">
                <Link to="/config" className="new-analysis-btn">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
                    Uusi analyysi
                </Link>
            </div>
            {inProgressJobs.length > 0 && (
              <div className="sidebar-section">
                  <h3 className="sidebar-title">Kesken</h3>
                  <ul className="job-list">
                      {inProgressJobs.map(job => (
                          <li key={job.id}><NavLink to={`/results?job=${job.id}`}>{job.name}</NavLink></li>
                      ))}
                  </ul>
              </div>
            )}
            {completedJobs.length > 0 && (
              <div className="sidebar-section">
                  <h3 className="sidebar-title">Valmiit</h3>
                  <ul className="job-list">
                      {completedJobs.map(job => (
                          <li key={job.id}><NavLink to={`/results?job=${job.id}`}>{job.name}</NavLink></li>
                      ))}
                  </ul>
              </div>
            )}
        </nav>
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppShell;
