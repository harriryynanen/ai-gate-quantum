
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';
import { api } from '../services/api';
import RecommendationCard from '../components/job/RecommendationCard';
import AlternativeCard from '../components/job/AlternativeCard';

function JobConfiguration() {
  const navigate = useNavigate();
  const { session, setSession } = useContext(SessionContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Recommendation data is now loaded via SessionContext
  const recommendationData = session?.recommendation;
  
  // Trigger recommendation generation if not already present
  useEffect(() => {
    if (session && !session.recommendation) {
      setLoading(true);
      api.getRecommendation({ sessionId: session.id })
        .then(recs => {
          // The API call returns the recommendation, which we set in the session
          setSession(prev => ({ ...prev, recommendation: recs, currentStage: 'config' }));
        })
        .catch(err => {
            console.error("Error fetching recommendation:", err);
            setError("Could not load AI recommendations. Please try again.");
        })
        .finally(() => setLoading(false));
    }
  }, [session, setSession]);

  const handleSelect = async (path, method) => {
    if (!session) return;

    setLoading(true);
    try {
      const job = await api.submitJob({ 
        sessionId: session.id,
        config: { path, method }
      });
      // The session object is now updated with the job info
      setSession(prev => ({ ...prev, job, currentStage: 'execution' }));
      navigate(`/execution?session=${session.id}`);
    } catch (err) {
      console.error("Error submitting job:", err);
      setError("Failed to start the job. Please check the console.");
      setLoading(false);
    }
  };

  if (loading && !recommendationData) return <div className="container mx-auto p-8 text-center">Generating AI recommendations...</div>;
  if (error) return <div className="container mx-auto p-8 text-center text-red-500">{error}</div>;
  if (!recommendationData) return <div className="container mx-auto p-8 text-center">No session active or recommendation found.</div>;
  
  const { recommendedPath, alternativePath, confidence, status, reasoningSummary } = recommendationData;

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">AI-Guided Decision Review</h1>
        <p className="text-lg text-gray-600 mb-8">The AI has analyzed your goal and proposed two paths. Review the trade-offs and select a path to proceed.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Recommended Path */}
          <RecommendationCard 
            method={recommendedPath.method}
            confidence={confidence}
            status={status}
            reasoning={reasoningSummary}
            tradeoffs={{ title: "Expected Trade-offs", items: recommendedPath.tradeoffs }}
            onSelect={() => handleSelect('recommended', recommendedPath.method)}
          />
          
          {/* Alternative Path */}
          <AlternativeCard 
            method={alternativePath.method}
            reasoning={alternativePath.reasoning}
            tradeoffs={{ title: "Expected Trade-offs", items: alternativePath.tradeoffs }}
            onSelect={() => handleSelect('alternative', alternativePath.method)}
          />
        </div>
      </div>
    </div>
  );
}

export default JobConfiguration;

