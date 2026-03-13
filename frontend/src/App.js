import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header.js';
import Dashboard from './pages/Dashboard.js';
import Chat from './pages/Chat.js';
import DataPreparation from './pages/DataPreparation.js';
import JobConfiguration from './pages/JobConfiguration.js';
import Execution from './pages/Execution.js';
import Results from './pages/Results.js';
import History from './pages/History.js';
import { SessionProvider } from './context/SessionContext.js';
import MainLayout from './layouts/MainLayout.js';
// import ProtectedRoute from './components/common/ProtectedRoute'; // Not used for now
import './App.css';

const App = () => {
  return (
    <Router>
      <SessionProvider>
        <Routes>
          <Route 
            path="/*" 
            element={
              // Authentication is bypassed for UI development
              <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
                <Header />
                <MainLayout>
                  <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/chat" element={<Chat />} />
                    <Route path="/data-preparation" element={<DataPreparation />} />
                    <Route path="/job-configuration" element={<JobConfiguration />} />
                    <Route path="/execution" element={<Execution />} />
                    <Route path="/results" element={<Results />} />
                    <Route path="/history" element={<History />} />
                  </Routes>
                </MainLayout>
              </div>
            }
          />
        </Routes>
      </SessionProvider>
    </Router>
  );
}

export default App;
