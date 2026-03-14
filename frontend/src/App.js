
import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import JobConfiguration from './pages/JobConfiguration';
import SolverRegistry from './pages/SolverRegistry';
import Data from './pages/Data';
import JobHistory from './pages/JobHistory';
import AIChatWorkspace from './pages/AIChatWorkspace';
import Results from './pages/Results';

import './styles/design_tokens.css';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="topnav">
        <div className="logo">
          <div className="logo-dot"></div>
          AI Gate Quantum
        </div>
        <div className="nav-sep"></div>
        <div className="nav-tabs">
          <NavLink to="/" className="nav-tab">Dashboard</NavLink>
          <NavLink to="/ai-chat" className="nav-tab">AI Chat</NavLink>
          <NavLink to="/solver-registry" className="nav-tab">Solvers</NavLink>
          <NavLink to="/data" className="nav-tab">Data</NavLink>
          <NavLink to="/job-history" className="nav-tab">History</NavLink>
        </div>
      </div>
      <div className="main">
        <div className="sidebar">
          <div className="sidebar-section">
            <NavLink to="/job-configuration" className="new-btn">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1v10M1 6h10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
              New Analysis
            </NavLink>
            <div className="sidebar-label">In Progress</div>
            <div className="session-item active">
              <div className="si-name">Option pricing — Q4</div>
              <div className="si-meta"><span className="badge badge-in-progress">Step 3/8</span><span className="si-date">Today</span></div>
            </div>
            <div className="session-item">
              <div className="si-name">Credit risk portfolio</div>
              <div className="si-meta"><span className="badge badge-in-progress">Step 2/8</span><span className="si-date">Yesterday</span></div>
            </div>
            <div className="sidebar-divider"></div>
            <div className="sidebar-label">Completed</div>
            <div className="session-item">
              <div className="si-name">Insurance loss sim</div>
              <div className="si-meta"><span className="badge badge-complete">Done</span><span className="si-date">3 days ago</span></div>
            </div>
          </div>
        </div>
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/job-configuration" element={<JobConfiguration />} />
            <Route path="/job-configuration/:jobId" element={<JobConfiguration />} />
            <Route path="/solver-registry" element={<SolverRegistry />} />
            <Route path="/data" element={<Data />} />
            <Route path="/job-history" element={<JobHistory />} />
            <Route path="/ai-chat" element={<AIChatWorkspace />} />
            <Route path="/results/:jobId" element={<Results />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
