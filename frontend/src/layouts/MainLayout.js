import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AIAssistantPanel from '../components/AIAssistant/AIAssistantPanel';
import './MainLayout.css'; // Import the CSS file

const MainLayout = ({ children }) => {
  const location = useLocation();
  // The AI assistant is shown on all pages except the dedicated chat page
  const showAssistant = location.pathname !== '/chat';
  // A mock session ID for URL consistency
  const mockSessionId = 'session-xyz-789';

  return (
    <div className="main-layout">
      <nav className="left-sidebar">
        <h1>QuantumFlow</h1>
        <ul>
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/chat">AI Chat</Link></li>
          {/* Corrected link paths */}
          <li><Link to="/data-prep">Data Preparation</Link></li>
          <li><Link to="/job-config">Job Configuration</Link></li>
          <li><Link to="/execution">Execution</Link></li>
          <li><Link to={`/results/${mockSessionId}`}>Results</Link></li>
          <li><Link to="/history">History</Link></li>
        </ul>
      </nav>

      <main className="main-workspace">
        {children}
      </main>

      {showAssistant && (
        <aside className="right-ai-rail">
          <AIAssistantPanel />
        </aside>
      )}
    </div>
  );
};

export default MainLayout;
