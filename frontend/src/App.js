
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/common/Header';
import Dashboard from './pages/Dashboard';
import DataPreparation from './pages/DataPreparation.js';
import JobConfiguration from './pages/JobConfiguration.js';
import Execution from './pages/Execution.js';
import Results from './pages/Results.js';
import History from './pages/History.js';
import MainLayout from './layouts/MainLayout.js';
import './App.css';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <Header />
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/data-preparation" element={<DataPreparation />} />
          <Route path="/job-configuration" element={<JobConfiguration />} />
          <Route path="/execution" element={<Execution />} />
          <Route path="/results" element={<Results />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </MainLayout>
    </div>
  );
}

export default App;
