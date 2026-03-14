
import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import JobConfiguration from './pages/JobConfiguration';
import SolverRegistry from './pages/SolverRegistry';
import Results from './pages/Results';
import JobHistory from './pages/JobHistory'; // Assuming this page exists
import AIChatWorkspace from './pages/AIChatWorkspace'; // Assuming this page exists
import './App.css';

function App() {
  return (
      <div className="app-container">
        <nav className="sidebar">
          <div className="sidebar-header">
            <h2>QAI Platform</h2>
          </div>
          <ul>
            <li><NavLink to="/" end><i className="fas fa-tachometer-alt"></i> Dashboard</NavLink></li>
            <li><NavLink to="/job-configuration"><i className="fas fa-play-circle"></i> New Job</NavLink></li>
            <li><NavLink to="/solver-registry"><i className="fas fa-cogs"></i> Solver Registry</NavLink></li>
            <li><NavLink to="/job-history"><i className="fas fa-history"></i> Job History</NavLink></li>
            <li><NavLink to="/ai-chat"><i className="fas fa-robot"></i> AI Chat</NavLink></li>
          </ul>
        </nav>
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/job-configuration" element={<JobConfiguration />} />
            <Route path="/solver-registry" element={<SolverRegistry />} />
            <Route path="/results" element={<Results />} />
             {/* The following are placeholders for routing */}
            <Route path="/job-history" element={<JobHistory />} />
            <Route path="/ai-chat" element={<AIChatWorkspace />} />
             <Route path="/results/:jobId" element={<Results />} />
          </Routes>
        </main>
      </div>
  );
}

export default App;
