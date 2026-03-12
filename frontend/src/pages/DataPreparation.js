
import React, { useContext, useState } from 'react';
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

    const handleUpload = async (uploadedFile) => {
        // In a real app, this would be a more sophisticated parsing
        const dataset = {
            name: uploadedFile.name,
            rowCount: 200, // mock
            columns: [{ name: 'Amount', type: 'number' }, { name: 'Risk Score', type: 'number' }]
        };

        const updatedSession = await api.uploadDataset({ sessionId: session.id, dataset });
        setSession(updatedSession);

        // After data upload, get a recommendation
        const recommendation = await api.getRecommendation({ sessionId: session.id });
        setRecs(recommendation);
    };
    
    const data = session?.dataset ? {
        columns: session.dataset.columns.map(c => c.name),
        rows: Array(5).fill(Array(session.dataset.columns.length).fill('mock data')) // Placeholder rows
    } : { columns: [], rows: [] };

    if (loading && !session) return <div>Loading session...</div>;
    if (error) return <div className="text-red-500">Error: {error}</div>;
    if (!session) return <div>No active session.</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Data Preparation</h1>
      {recs && <AIRecommendation method={recs.recommendedMethod.name} reason={recs.reasoning} />}
      <Card>
        <DataToolbar onUpload={handleUpload} />
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
