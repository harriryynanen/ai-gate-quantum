
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';
import RecommendationCard from '../components/job/RecommendationCard';
import AlternativeCard from '../components/job/AlternativeCard';
import { CodeTransparencyCard } from '../components/job/CodeTransparencyCard';

function JobConfiguration() {
  const navigate = useNavigate();
  const { session, recommendation, generateRecommendation, loading, solvers } = useContext(SessionContext);
  const [error, setError] = useState('');

  useEffect(() => {
    if (session && !recommendation) {
      generateRecommendation(session.id).catch(err => {
        console.error("Error fetching recommendation:", err);
        setError("Could not load AI recommendations. Please try again.");
      });
    }
  }, [session, recommendation, generateRecommendation]);

  const handleSelect = async (solverId) => {
    if (!session) return;

    try {
        // The startExecution function is now in api.js
        // It will be called from here, and the context will update.
        navigate(`/execution?session=${session.id}`);
    } catch (err) {
      console.error("Error submitting job:", err);
      setError("Failed to start the job. Please check the console.");
    }
  };

  if (loading || !solvers.length) return <div className="container mx-auto p-8 text-center">Loading AI recommendations and solver data...</div>;
  if (error) return <div className="container mx-auto p-8 text-center text-red-500">{error}</div>;
  if (!recommendation) return <div className="container mx-auto p-8 text-center">No session active or recommendation found.</div>;
  
  const { 
    confidence,
    reasoningSummary,
    mappedSolverId,
    alternativePath
  } = recommendation;

  const recommendedSolver = solvers.find(s => s.id === mappedSolverId);
  const alternativeSolverId = alternativePath === "classical" ? "classical_baseline" : "quantum_inspired_annealing";
  const alternativeSolver = solvers.find(s => s.id === alternativeSolverId);


  if (!recommendedSolver || !alternativeSolver) {
    return <div className="container mx-auto p-8 text-center text-red-500">Error: Could not find a matching solver for the recommendation. Please check the solver catalog.</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">AI-Guided Decision Review</h1>
        <p className="text-lg text-gray-600 mb-8">The AI has analyzed your goal and proposed a path. Review the trade-offs and select a path to proceed.</p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
          <RecommendationCard 
            solver={recommendedSolver}
            confidence={confidence}
            reasoning={reasoningSummary}
            recommendation={recommendation} // Pass the whole recommendation
            onSelect={() => handleSelect(recommendedSolver.id)}
          />
          
          <AlternativeCard 
            solver={alternativeSolver}
            reasoning={recommendation.classicalFitRationale} // Example, adjust as needed
            onSelect={() => handleSelect(alternativeSolver.id)}
          />
        </div>

        <CodeTransparencyCard solver={recommendedSolver} />
      </div>
    </div>
  );
}

export default JobConfiguration;
