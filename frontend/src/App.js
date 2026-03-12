import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AIChatWorkspace from './pages/AIChatWorkspace';
import DataPreparation from './pages/DataPreparation';
import JobConfiguration from './pages/JobConfiguration';
import ExecutionMonitor from './pages/ExecutionMonitor';
import Results from './pages/Results';
import JobHistory from './pages/JobHistory';
import { SessionProvider } from './context/SessionContext';
import './App.css';

function App() {
  return (
    <Router>
      <SessionProvider>
        <div className="app">
          <nav className="sidebar">
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/chat">AI Chat</Link></li>
              <li><Link to="/data">Data Preparation</Link></li>
              <li><Link to="/job-configuration">Job Configuration</Link></li>
              <li><Link to="/execution">Execution Monitor</Link></li>
              <li><Link to="/results">Results</Link></li>
              <li><Link to="/history">Job History</Link></li>
            </ul>
          </nav>
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/chat" element={<AIChatWorkspace />} />
              <Route path="/data" element={<DataPreparation />} />
              <Route path="/job-configuration" element={<JobConfiguration />} />
              <Route path="/execution" element={<ExecutionMonitor />} />
              <Route path="/results" element={<Results />} />
              <Route path="/history" element={<JobHistory />} />
            </Routes>
          </main>
        </div>
      </SessionProvider>
    </Router>
  );
}

export default App;
