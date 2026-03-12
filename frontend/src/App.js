import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import DataPreparation from './pages/DataPreparation';
import JobConfiguration from './pages/JobConfiguration';
import ExecutionMonitor from './pages/ExecutionMonitor';
import Results from './pages/Results';
import History from './pages/History';
import { SessionProvider } from './context/SessionContext';
import MainLayout from './layouts/MainLayout';
import './App.css';

const App = () => {
  return (
    <Router>
      <SessionProvider>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
          <Header />
          <MainLayout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/data-prep" element={<DataPreparation />} />
              <Route path="/job-config" element={<JobConfiguration />} />
              <Route path="/execution" element={<ExecutionMonitor />} />
              <Route path="/results/:sessionId" element={<Results />} />
              <Route path="/history" element={<History />} />
            </Routes>
          </MainLayout>
        </div>
      </SessionProvider>
    </Router>
  );
}

export default App;
