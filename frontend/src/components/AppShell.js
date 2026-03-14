import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './AppShell.css';

const AppShell = () => {
  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="logo">QuantumFlow</div>
        <nav className="top-nav">
          <Link to="/">Dashboard</Link>
          <Link to="/config">New Job</Link>
          <Link to="/history">History</Link>
          <Link to="/solvers">Solver Registry</Link>
        </nav>
        <div className="user-profile">User</div>
      </header>
      <div className="app-body">
        <nav className="left-nav">
          {/* This area can be used for session history or contextual navigation */}
          <p>Session History</p>
          <ul>
            <li>Job #1234 - In Progress</li>
            <li>Job #1233 - Complete</li>
          </ul>
        </nav>
        <main className="main-content">
          <Outlet /> {/* Child routes will render here */}
        </main>
        <aside className="right-rail">
          <div className="ai-assistant-panel">
            <h4>AI Assistant</h4>
            <p>Your contextual AI partner.</p>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default AppShell;
