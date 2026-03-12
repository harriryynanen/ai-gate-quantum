
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import DataTable from '../components/data/DataTable';
import DataToolbar from '../components/data/DataToolbar';
import AIRecommendation from '../components/data/AIRecommendation';
import { SessionContext } from '../context/SessionContext';
import { api } from '../services/api';

function DataPreparation() {
  const { session, setSession, loading, error } = useContext(SessionContext);
  const [recs, setRecs] = useState(null);

  // Get recommendations on initial load
  useEffect(() => {
    if (session && !recs) {
      api.getRecommendation({ sessionId: session.id }).then(setRecs);
    }
  }, [session, recs]);

  const handleUpload = async (uploadedFile) => {
    const dataset = {
      name: uploadedFile.name,
      rowCount: 200, // Mock row count
      columns: [{ name: 'Amount', type: 'number' }, { name: 'Risk Score', type: 'number' }]
    };
    const updatedSession = await api.uploadDataset({ sessionId: session.id, dataset });
    setSession(updatedSession);
    // Refresh recommendations after upload
    api.getRecommendation({ sessionId: session.id }).then(setRecs);
  };

  // Construct DataTable-friendly data from session
  const data = session?.dataset ? {
    columns: session.dataset.columns.map(c => c.name),
    // Show placeholder data for preview
    rows: Array(5).fill(null).map((_, i) => [
      `txn-${i}`,
      (Math.random() * 5000).toFixed(2),
      (Math.random() * 1).toFixed(3),
    ])
  } : { columns: [], rows: [] };

  if (loading && !session) return <div>Loading session...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!session) return <div>No active session.</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Data Preparation</h1>
      {recs && 
        <AIRecommendation 
          method={recs.recommendedMethod.name} 
          reason={recs.justification} 
        />
      }
      <Card>
        <DataToolbar onUpload={handleUpload} datasetName={session.dataset.name} />
        <DataTable data={data} />
        <div className="mt-6 text-right">
          <Link to="/job-config" className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600">
            Proceed to Configuration &rarr;
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default DataPreparation;
