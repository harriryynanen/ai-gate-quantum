import React from 'react';
import { Link } from 'react-router-dom';
import AIAssistantPanel from '../components/AIAssistant/AIAssistantPanel';

const MainLayout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gray-100">
      <nav className="w-56 bg-gray-800 text-white p-4 hidden md:block">
        <h1 className="text-2xl font-bold mb-6">QuantumFlow</h1>
        <ul>
          <li className="mb-2"><Link to="/" className="hover:text-blue-300">Dashboard</Link></li>
          <li className="mb-2"><Link to="/chat" className="hover:text-blue-300">AI Chat</Link></li>
          <li className="mb-2"><Link to="/data" className="hover:text-blue-300">Data Preparation</Link></li>
          <li className="mb-2"><Link to="/config" className="hover:text-blue-300">Job Configuration</Link></li>
          <li className="mb-2"><Link to="/execution" className="hover:text-blue-300">Execution</Link></li>
          <li className="mb-2"><Link to="/results" className="hover:text-blue-300">Results</Link></li>
          <li className="mb-2"><Link to="/history" className="hover:text-blue-300">History</Link></li>
        </ul>
      </nav>

      <main className="flex-grow p-8 overflow-y-auto">
        {children}
      </main>

      <aside className="w-96 bg-white shadow-lg">
        <AIAssistantPanel />
      </aside>
    </div>
  );
};

export default MainLayout;
