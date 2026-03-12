import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import DataPreparation from './pages/DataPreparation';
import JobConfiguration from './pages/JobConfiguration';
import Execution from './pages/Execution';
import Results from './pages/Results';
import History from './pages/History';
import LoginPage from './pages/LoginPage';
import { SessionProvider } from './context/SessionContext';
import MainLayout from './layouts/MainLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import './App.css';

const App = () => {
  return (
    <Router>
      <SessionProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
            path="/*" 
            element={
              <ProtectedRoute>
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
              </ProtectedRoute>
            }
          />
        </Routes>
      </SessionProvider>
    </Router>
  );
}

export default App;
