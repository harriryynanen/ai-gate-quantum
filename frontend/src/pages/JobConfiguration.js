
import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';
import { api } from '../services/api';
import RecommendedMethod from '../components/job/RecommendedMethod';
import AlternativeMethod from '../components/job/AlternativeMethod';
import Card from '../components/common/Card';

function JobConfiguration() {
  const navigate = useNavigate();
  const { session, setSession } = useContext(SessionContext);
  const [recs, setRecs] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session && !recs) {
      api.getRecommendation({ sessionId: session.id })
        .then(setRecs)
        .finally(() => setLoading(false));
    }
  }, [session, recs]);

  const handleApprove = async () => {
    const jobConfig = { 
      method: recs.recommendedMethod,
      parameters: { isExploratory: recs.recommendedMethod.exploratory } 
    };
    const updatedSession = await api.submitJob({ sessionId: session.id, config: jobConfig });
    setSession(updatedSession);
    navigate('/execution');
  };

  const handleSelectAlternative = async () => {
    const jobConfig = { 
      method: recs.alternateMethod,
      parameters: { isBaseline: true } 
    };
    const updatedSession = await api.submitJob({ sessionId: session.id, config: jobConfig });
    setSession(updatedSession);
    navigate('/execution');
  };

  if (loading || !recs) return <div>Loading recommendations...</div>;

  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">AI Method Recommendation</h1>
        <p className="text-lg text-gray-600 mt-2">The AI has recommended the optimal analysis method for your goal.</p>
      </div>

      <RecommendedMethod 
        method={recs.recommendedMethod} 
        justification={recs.justification} 
        confidence={recs.confidence}
        onApprove={handleApprove}
      />

      <div className="mt-10">
          <h2 className="text-xl font-semibold text-center mb-4">Alternative Option</h2>
          <Card>
             <AlternativeMethod method={recs.alternateMethod} onSelect={handleSelectAlternative} />
          </Card>
      </div>

    </div>
  );
}

export default JobConfiguration;
