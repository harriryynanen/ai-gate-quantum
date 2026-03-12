
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

import Card from '../components/common/Card';
import DataTable from '../components/data/DataTable';
import DataToolbar from '../components/data/DataToolbar';
import MethodRecommendation from '../components/views/MethodRecommendation';
import LoadingSpinner from '../components/common/LoadingSpinner';

const functions = getFunctions();
const generateRecommendation = httpsCallable(functions, 'generateRecommendation');

function DataPreparation() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session');

  const [session, setSession] = useState(null);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState('session'); // 'session', 'recommendation', or false
  const [error, setError] = useState(null);
  
  // Effect to fetch session and then trigger recommendation generation
  useEffect(() => {
    if (!sessionId) {
      setError('No session ID provided.');
      setLoading(false);
      return;
    }

    const sessionRef = doc(db, 'sessions', sessionId);
    getDoc(sessionRef).then(docSnap => {
      if (docSnap.exists()) {
        const sessionData = { id: docSnap.id, ...docSnap.data() };
        setSession(sessionData);

        if (!sessionData.recommendationId) {
          setLoading('recommendation');
          generateRecommendation({ sessionId })
            .then(result => {
              // The function call succeeded, now we need to fetch the data
              // The session document will be updated, so we re-fetch it.
               getDoc(sessionRef).then(updatedDocSnap => {
                 const updatedSessionData = { id: updatedDocSnap.id, ...updatedDocSnap.data() };
                 setSession(updatedSessionData);
                 // Now fetch the recommendation document itself
                 const recommendationRef = doc(db, 'recommendations', updatedSessionData.recommendationId);
                 getDoc(recommendationRef).then(recDocSnap => {
                   if(recDocSnap.exists()) {
                       setRecommendation({ id: recDocSnap.id, ...recDocSnap.data() });
                   } else {
                       setError('Could not fetch recommendation details.');
                   }
                   setLoading(false);
                 });
               });
            })
            .catch(err => {
              console.error("Error generating recommendation:", err);
              setError('An error occurred while generating the AI recommendation.');
              setLoading(false);
            });
        } else {
          // Recommendation already exists, just fetch it
          const recommendationRef = doc(db, 'recommendations', sessionData.recommendationId);
          getDoc(recommendationRef).then(recDocSnap => {
             if(recDocSnap.exists()) {
                setRecommendation({ id: recDocSnap.id, ...recDocSnap.data() });
             } else {
                setError('Could not fetch recommendation details.');
             }
             setLoading(false);
          });
        }
      } else {
        setError('Session not found.');
        setLoading(false);
      }
    }).catch(err => {
        console.error("Error fetching session:", err);
        setError('Failed to load session data.');
        setLoading(false);
    });

  }, [sessionId]);

  const handleUpload = (file) => { /* Mock handler */ };

  const renderContent = () => {
    if (loading === 'session') {
      return <LoadingSpinner text="Loading session data..." />;
    }
    if (loading === 'recommendation') {
        return <LoadingSpinner text={`Analyzing your goal: \"${session?.goal}\"...`} />;
    }
    if (error) {
      return <p className="text-red-500 text-center p-8">{error}</p>;
    }
    if (!session || !recommendation) {
      return <p className="text-gray-500 text-center p-8">No session or recommendation data available.</p>;
    }

    return (
      <>
        <MethodRecommendation recommendation={recommendation} />
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
      <h1 className="text-3xl font-bold mb-6">AI Method Recommendation</h1>
      {renderContent()}
    </div>
  );
}

export default DataPreparation;
