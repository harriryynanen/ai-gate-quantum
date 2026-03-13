
import React, { useState, useEffect } from 'react';
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
import { initFirebase, isFirebaseInitialized } from './firebase.js';
import './App.css';

// Initialize Firebase
initFirebase();

const FirebaseNotConfigured = () => (
  <div className="flex items-center justify-center h-screen bg-gray-100">
    <div className="bg-white p-10 rounded-lg shadow-xl text-center">
      <h1 className="text-2xl font-bold text-red-600 mb-4">Firebase Not Configured</h1>
      <p className="text-gray-700">The Firebase environment configuration is missing or incomplete.</p>
      <p className="text-gray-700">Please check your <code>.env</code> file and ensure all Firebase variables are set correctly.</p>
      <p className="mt-4 text-sm text-gray-500">The app is running in a limited, offline mode.</p>
    </div>
  </div>
);

const App = () => {
  const [firebaseReady, setFirebaseReady] = useState(isFirebaseInitialized());

  useEffect(() => {
    // This effect will re-run if the initialized state changes,
    // although in this setup, it should only run once.
    setFirebaseReady(isFirebaseInitialized());
  }, []);

  if (!firebaseReady) {
    return <FirebaseNotConfigured />;
  }

  return (
    <Router>
      <SessionProvider>
        <Routes>
          <Route 
            path="/*" 
            element={
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
