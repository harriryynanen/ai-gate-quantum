
import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import DataTable from '../components/data/DataTable';
import DataToolbar from '../components/data/DataToolbar';
import AIRecommendation from '../components/data/AIRecommendation';
import { SessionContext } from '../context/SessionContext';
import { api } from '../services/api';

function DataPreparation() {
  const { session, setSession } = useContext(SessionContext);
  const [recs, setRecs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session && !session.recommendation) {
        api.getRecommendation({ sessionId: session.id })
          .then(data => {
            setRecs(data);
            // Also update the main session context
            setSession(prev => ({ ...prev, recommendation: data.recommendation, alternative: data.alternative }));
          })
          .finally(() => setLoading(false));
    } else if (session?.recommendation) {
        setRecs({ recommendation: session.recommendation, alternative: session.alternative });
        setLoading(false);
    }
  }, [session, setSession]);

  const handleUpload = async (uploadedFile) => {
    // This is a mock implementation
    const dataset = {
      name: uploadedFile.name,
      rowCount: 200, 
      columns: [{ name: 'Amount', type: 'number' }, { name: 'Risk Score', type: 'number' }]
    };
    
    // In a real app, we might wait for this to finish
    api.uploadDataset({ sessionId: session.id, dataset });

    setSession(prev => ({...prev, dataset}));
  };

  const data = session?.dataset ? {
    columns: session.dataset.columns.map(c => c.name),
    rows: Array(5).fill(null).map((_, i) => [
      `txn-${i}`,
      (Math.random() * 5000).toFixed(2),
      (Math.random() * 1).toFixed(3),
    ])
  } : { columns: [], rows: [] };

  if (loading && !session) return <div className="container mx-auto p-8 text-center">Loading session...</div>;

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Data Preparation</h1>
      {recs?.recommendation && 
        <AIRecommendation 
          method={recs.recommendation.method.name} 
          reason={recs.recommendation.reasoning} 
        />
      }
      <Card>
        <DataToolbar onUpload={handleUpload} datasetName={session?.dataset?.name} />
        <DataTable data={data} />
        <div className="mt-6 text-right">
          <Link to="/job-configuration" className="bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
            Proceed to AI Decision Review &rarr;
          </Link>
        </div>
      </Card>
    </div>
  );
}

export default DataPreparation;
