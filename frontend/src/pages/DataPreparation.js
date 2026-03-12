import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import DataTable from '../components/data/DataTable';
import DataToolbar from '../components/data/DataToolbar';
import AIRecommendation from '../components/data/AIRecommendation';

const mockData = {
  columns: ['Transaction ID', 'Amount', 'Timestamp', 'Risk Score'],
  rows: [
    ['txn-001', 150.00, new Date().toISOString(), 0.1],
    ['txn-002', 3200.50, new Date().toISOString(), 0.8],
    ['txn-003', 45.99, new Date().toISOString(), 0.05],
    ['txn-004', 12000.00, new Date().toISOString(), 0.95],
  ],
};

function DataPreparation() {
  const [data, setData] = useState(mockData);

  const handleUpload = (uploadedData) => {
    setData(uploadedData);
    // In a real app, this would trigger further AI analysis and validation steps.
  };

  const aiMethod = "Risk Scoring with Quantum-inspired Optimization";
  const aiReason = "The 'Quantum-inspired Optimization' model is recommended for its ability to analyze complex risk scenarios with high dimensionality, which is suitable for your financial transaction data. It provides a more robust risk score than purely classical methods."

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Data Preparation</h1>
      <AIRecommendation method={aiMethod} reason={aiReason} />
      <Card>
        <DataToolbar onUpload={handleUpload} />
        <DataTable data={data} />
         <div className="mt-6 text-right">
            <Link to="/config" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
                Proceed to Configuration &rarr;
            </Link>
        </div>
      </Card>
    </div>
  );
}

export default DataPreparation;
