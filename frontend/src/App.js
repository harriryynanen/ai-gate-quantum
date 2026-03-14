import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AIChatWorkspace from './pages/AIChatWorkspace';
import JobConfiguration from './pages/JobConfiguration';
import ExecutionMonitor from './pages/ExecutionMonitor';
import ResultPage from './pages/ResultPage';
import JobHistory from './pages/JobHistory';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/">Dashboard</Link></li>
            <li><Link to="/chat">AI Chat</Link></li>
            {/* Link to Data Preparation removed as it is now the first step in Job Configuration */}
            <li><Link to="/config">Configure Job</Link></li>
            <li><Link to="/monitor">Execution Monitor</Link></li>
            <li><Link to="/results">Result Page</Link></li>
            <li><Link to="/history">Job History</Link></li>
          </ul>
        </nav>
        <main>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat" element={<AIChatWorkspace />} />
            {/* Route for Data Preparation removed */}
            <Route path="/config" element={<JobConfiguration />} />
            <Route path="/monitor" element={<ExecutionMonitor />} />
            <Route path="/results" element={<ResultPage />} />
            <Route path="/history" element={<JobHistory />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
