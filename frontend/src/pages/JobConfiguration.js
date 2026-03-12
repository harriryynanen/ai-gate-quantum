
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MethodSelectionCard from '../components/job/MethodSelectionCard';
import { SessionContext } from '../context/SessionContext';
import { api } from '../services/api';

function JobConfiguration() {
  const navigate = useNavigate();
  const { session, setSession } = useContext(SessionContext);
  const [recs, setRecs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      api.getRecommendation({ sessionId: session.id })
        .then(setRecs)
        .finally(() => setLoading(false));
    }
  }, [session]);

  const handleSelectMethod = async (method) => {
    const jobConfig = { 
        method, 
        parameters: { mockParam: 'value' } // Placeholder
    };
    const updatedSession = await api.submitJob({ sessionId: session.id, config: jobConfig });
    setSession(updatedSession);
    navigate('/execution'); // Navigate to execution monitor
  };

  if (loading || !recs) return <div>Loading recommendations...</div>;

  const recommendedMethod = {
      name: recs.recommendedMethod.name,
      description: "A powerful solver for complex optimization problems, ideal for uncovering non-obvious solutions in large datasets.",
      reason: recs.reasoning,
      method: recs.recommendedMethod
  };

  const alternativeMethod = {
      name: recs.alternateMethod.name,
      description: "A standard, robust method for simulating a wide range of possibilities to assess risk.",
      reason: "This is a well-understood, fast, and reliable method for risk analysis.",
      method: recs.alternateMethod
  };

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Select Your Analysis Method</h1>
        <p className="text-lg text-gray-600 mt-2">The AI has recommended a method based on your goals, but you have the final say.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MethodSelectionCard method={recommendedMethod} onSelect={handleSelectMethod} isRecommended={true} />
        <MethodSelectionCard method={alternativeMethod} onSelect={handleSelectMethod} isRecommended={false} />
      </div>
    </div>
  );
}

export default JobConfiguration;
