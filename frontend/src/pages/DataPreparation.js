
import React, { useState, useEffect, useContext } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';

import Card from '../components/common/Card';
import DataTable from '../components/data/DataTable';
import DataToolbar from '../components/data/DataToolbar';
import MethodRecommendation from '../components/views/MethodRecommendation';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProblemFormulationCard from '../components/job/ProblemFormulationCard';
import DataReadinessCard from '../components/job/DataReadinessCard';

function DataPreparation() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session');
  
  const { 
    session, 
    recommendation, 
    generateRecommendation, 
    loading: contextLoading, 
    error: contextError 
  } = useContext(SessionContext);

  const [localError, setLocalError] = useState(null);
  
  // Effect to trigger recommendation generation if needed
  useEffect(() => {
    if (session && !session.recommendationId && !recommendation && !contextLoading) {
      generateRecommendation(session.id).catch(err => {
        console.error("Error generating recommendation:", err);
        setLocalError('An error occurred while generating the AI recommendation.');
      });
    }
  }, [session, recommendation, generateRecommendation, contextLoading]);


  const handleUpload = (file) => { /* Mock handler */ };

  const renderContent = () => {
    const error = contextError || localError;
    if (contextLoading) return <LoadingSpinner text="Loading session..." />;
    if (error) return <p className="text-red-500 text-center p-8">{error.toString()}</p>;
    if (!session) return <p className="text-gray-500 text-center p-8">No session data available. Please start a new session.</p>;

    return (
      <>
        {session.formulation && <ProblemFormulationCard formulation={session.formulation} />}
        {session.dataReadiness && <DataReadinessCard readiness={session.dataReadiness} />}
        
        {recommendation 
            ? <MethodRecommendation recommendation={recommendation} /> 
            : <LoadingSpinner text="Generating AI method recommendation..." />
        }
        
        <Card>
          <DataToolbar onUpload={handleUpload} datasetName={session?.dataset?.name} />
          <DataTable data={{ columns: [], rows: [] }} />
          <div className="mt-6 text-right">
            <Link 
              to={`/job-configuration?session=${sessionId}`} 
              className={`bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300 ${!recommendation ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
              onClick={(e) => !recommendation && e.preventDefault()}
            >
              Proceed to Job Configuration &rarr;
            </Link>
          </div>
        </Card>
      </>
    );
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Problem Formulation & AI Recommendation</h1>
      {renderContent()}
    </div>
  );
}

export default DataPreparation;
