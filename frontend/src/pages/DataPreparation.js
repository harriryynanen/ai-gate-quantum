
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

import Card from '../components/common/Card';
import DataTable from '../components/data/DataTable';
import DataToolbar from '../components/data/DataToolbar';
import MethodRecommendation from '../components/views/MethodRecommendation';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ProblemFormulationCard from '../components/job/ProblemFormulationCard';
import DataReadinessCard from '../components/job/DataReadinessCard';

const functions = getFunctions();
const formulateProblem = httpsCallable(functions, 'formulateProblem');
const generateRecommendation = httpsCallable(functions, 'generateRecommendation');

function DataPreparation() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session');

  const [session, setSession] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState('session'); // 'session', 'formulating', 'recommendation', or false
  const [error, setError] = useState(null);

  // Effect to fetch session, formulate problem, and then generate recommendation
  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided.');
      setLoading(false);
      return;
    }

    const sessionRef = doc(db, 'sessions', sessionId);
    
    const unsubscribe = onSnapshot(sessionRef, (docSnap) => {
      if (docSnap.exists()) {
        const sessionData = { id: docSnap.id, ...docSnap.data() };
        setSession(sessionData);

        // 1. Formulation Step
        if (!sessionData.formulation) {
          setLoading('formulating');
          formulateProblem({ sessionId })
            .catch(err => {
              console.error("Error formulating problem:", err);
              setError('An error occurred during problem formulation.');
              setLoading(false);
            });
          return; // The snapshot listener will pick up the change
        }

        // 2. Recommendation Step
        if (!sessionData.recommendationId) {
          setLoading('recommendation');
          generateRecommendation({ sessionId })
            .catch(err => {
              console.error("Error generating recommendation:", err);
              setError('An error occurred while generating the AI recommendation.');
              setLoading(false);
            });
            return; // The snapshot listener will pick up the change
        }
        
        // 3. Fetch Recommendation Details
        if (sessionData.recommendationId && !recommendation) {
             const recommendationRef = doc(db, 'recommendations', sessionData.recommendationId);
             getDoc(recommendationRef).then(recDocSnap => {
                if(recDocSnap.exists()) {
                   setRecommendation({ id: recDocSnap.id, ...recDocSnap.data() });
                } else {
                   setError('Could not fetch recommendation details.');
                }
                setLoading(false);
             });
        } else if (recommendation) {
            setLoading(false); // Already have recommendation
        }

      } else {
        setError('Session not found.');
        setLoading(false);
      }
    }, (err) => {
      console.error("Error subscribing to session updates:", err);
      setError('Failed to load session data.');
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount

  }, [sessionId, recommendation]);


  const handleUpload = (file) => { /* Mock handler */ };

  const renderContent = () => {
    if (loading === 'session') return <LoadingSpinner text="Loading session data..." />;
    if (loading === 'formulating') return <LoadingSpinner text={`Formulating the problem based on your goal: \"${session?.goal}\"...`} />;
    if (loading === 'recommendation') return <LoadingSpinner text="Generating AI method recommendation..." />;
    if (error) return <p className="text-red-500 text-center p-8">{error}</p>;
    if (!session) return <p className="text-gray-500 text-center p-8">No session data available.</p>;

    return (
      <>
        {session.formulation && <ProblemFormulationCard formulation={session.formulation} />}
        {session.dataReadiness && <DataReadinessCard readiness={session.dataReadiness} />}
        {recommendation ? <MethodRecommendation recommendation={recommendation} /> : <LoadingSpinner text="Waiting for recommendation..."/>}
        
        <Card>
          <DataToolbar onUpload={handleUpload} datasetName={session?.dataset?.name} />
          <DataTable data={{ columns: [], rows: [] }} />
          <div className="mt-6 text-right">
            <Link to={`/job-configuration?session=${sessionId}`} className="bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-300">
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
