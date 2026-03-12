
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';
import { api } from '../services/api';
import RecommendationCard from '../components/job/RecommendationCard';
import AlternativeCard from '../components/job/AlternativeCard';

function JobConfiguration() {
  const navigate = useNavigate();
  const { session, setSession } = useContext(SessionContext);
  const [recommendation, setRecommendation] = useState(null);
  const [alternative, setAlternative] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session && !session.recommendation) {
      const fetchRecommendation = async () => {
        try {
          const data = await api.getRecommendation({ sessionId: session.id });
          setRecommendation(data.recommendation);
          setAlternative(data.alternative);
          setSession(prev => ({ ...prev, recommendation: data.recommendation, alternative: data.alternative }));
        } catch (error) {
          console.error("Error fetching recommendation:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchRecommendation();
    } else if (session && session.recommendation) {
        setRecommendation(session.recommendation);
        setAlternative(session.alternative);
        setLoading(false);
    }
  }, [session, setSession]);

  const handleSelect = async (selectedConfig) => {
    try {
      const newJob = await api.submitJob({ sessionId: session.id, config: selectedConfig });
      setSession(prev => ({ ...prev, job: newJob }));
      navigate('/execution');
    } catch (error) {
      console.error('Error submitting job:', error);
    }
  };

  if (loading) {
    return <div className="container mx-auto p-8 text-center">Loading AI Recommendation...</div>;
  }

  if (!recommendation) {
    return <div className="container mx-auto p-8 text-center">Could not load recommendation.</div>
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">AI-Guided Decision Review</h1>
        <p className="text-xl text-gray-600 text-center mb-12">Review the AI's recommendation and choose your analysis path.</p>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            
            {/* Recommended Option (Main) */}
            <div className="lg:col-span-3">
                <h2 className="text-2xl font-semibold mb-4 text-blue-600">Recommended Path</h2>
                <RecommendationCard 
                    method={recommendation.method}
                    confidence={recommendation.confidence}
                    status={recommendation.status}
                    reasoning={recommendation.reasoning}
                    tradeoffs={recommendation.tradeoffs}
                    onSelect={() => handleSelect({ method: recommendation.method })}
                />
            </div>

            {/* Alternative Option (Side) */}
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-semibold mb-4 text-gray-700">Alternative Path</h2>
                <AlternativeCard
                    method={alternative.method}
                    reasoning={alternative.reasoning}
                    tradeoffs={alternative.tradeoffs}
                    onSelect={() => handleSelect({ method: alternative.method })}
                />
            </div>
        </div>
      </div>
    </div>
  );
}

export default JobConfiguration;
