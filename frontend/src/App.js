import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppShell from './components/AppShell';
import Dashboard from './pages/Dashboard';
import AIChatWorkspace from './pages/AIChatWorkspace';
import JobConfiguration from './pages/JobConfiguration';
import ExecutionMonitor from './pages/ExecutionMonitor';
import ResultPage from './pages/ResultPage';
import JobHistory from './pages/JobHistory';
import SolverRegistry from './pages/SolverRegistry';
import DataPreparation from './pages/DataPreparation';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />}>
        <Route index element={<Dashboard />} />
        <Route path="chat" element={<AIChatWorkspace />} />
        <Route path="data" element={<DataPreparation />} />
        <Route path="config" element={<JobConfiguration />} />
        <Route path="monitor" element={<ExecutionMonitor />} />
        <Route path="results" element={<ResultPage />} />
        <Route path="history" element={<JobHistory />} />
        <Route path="solvers" element={<SolverRegistry />} />
      </Route>
    </Routes>
  );
}

export default App;
