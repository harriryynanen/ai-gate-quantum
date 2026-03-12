import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import AIChatWorkspace from './pages/AIChatWorkspace';
import DataPreparation from './pages/DataPreparation';
import JobConfiguration from './pages/JobConfiguration';
import ExecutionMonitor from './pages/ExecutionMonitor';
import Results from './pages/Results';
import JobHistory from './pages/JobHistory';
import { SessionProvider } from './context/SessionContext';
import MainLayout from './layouts/MainLayout';
import './App.css';

const App = () => {
  return (
    <Router>
      <SessionProvider>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/chat" element={<AIChatWorkspace />} />
            <Route path="/data" element={<DataPreparation />} />
            <Route path="/config" element={<JobConfiguration />} />
            <Route path="/execution" element={<ExecutionMonitor />} />
            <Route path="/results/:sessionId" element={<Results />} />
            <Route path="/history" element={<JobHistory />} />
          </Routes>
        </MainLayout>
      </SessionProvider>
    </Router>
  );
}

export default App;
