
import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AIAssistantPanel from '../components/AIAssistant/AIAssistantPanel';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const showAssistant = location.pathname !== '/chat';

  return (
    <div className="main-layout">
      <div className="topnav">
        <div className="logo">
          <div className="logo-dot"></div>
          AI Gate Quantum
        </div>
        <div className="nav-sep"></div>
        <div className="nav-tabs">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-tab active' : 'nav-tab')}>Dashboard</NavLink>
          <NavLink to="/workflow" className={({ isActive }) => (isActive ? 'nav-tab active' : 'nav-tab')}>Analyysit</NavLink>
          <NavLink to="/solvers" className={({ isActive }) => (isActive ? 'nav-tab active' : 'nav-tab')}>Solverit</NavLink>
          <NavLink to="/data" className={({ isActive }) => (isActive ? 'nav-tab active' : 'nav-tab')}>Data</NavLink>
        </div>
      </div>
      <div className="main-content-area">
        <nav className="left-sidebar">
          {/* Placeholder for session history */}
          <p>Session History Placeholder</p>
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
    </div>
  );
};

export default MainLayout;
