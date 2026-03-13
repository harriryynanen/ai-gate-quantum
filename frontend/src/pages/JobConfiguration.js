
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionContext } from '../context/SessionContext';
import RecommendationCard from '../components/job/RecommendationCard';
import AlternativeCard from '../components/job/AlternativeCard';
import { SolverInputCard } from '../components/job/SolverInputCard';
import { ArrowRightIcon } from '@heroicons/react/24/solid';

function JobConfiguration() {
  const navigate = useNavigate();
  const { 
    session, 
    recommendation, 
    generateRecommendation, 
    loading, 
    solvers, 
    solverInputContract,
    prepareSolverInput, 
    executeSolver 
  } = useContext(SessionContext);
  
  const [error, setError] = useState('');
  const [selectedSolver, setSelectedSolver] = useState(null);

  useEffect(() => {
    if (session && !recommendation) {
      generateRecommendation(session.id).catch(err => {
        console.error("Error fetching recommendation:", err);
        setError("Could not load AI recommendations. Please try again.");
      });
    }
  }, [session, recommendation, generateRecommendation]);

  const handleSelectAndPrepare = async (solver) => {
    if (!session) return;
    setSelectedSolver(solver);
    setError(''); // Clear previous errors

    try {
      await prepareSolverInput(session.id);
    } catch (err) {
      console.error("Error preparing solver input:", err);
      setError("Failed to prepare solver input. See console for details.");
      setSelectedSolver(null); // Deselect on error
    }
  };
  
  const handleExecuteSolver = async () => {
    if (session && solverInputContract) {
      try {
        await executeSolver(session.id, solverInputContract.id);
      } catch (err) {
        console.error("Error executing solver:", err);
        setError("Failed to start execution. See console for details.");
      }
    }
  };

  if (loading || !solvers.length) return <div className="container mx-auto p-8 text-center">Loading AI recommendations and solver data...</div>;
  if (error && !solverInputContract) return <div className="container mx-auto p-8 text-center text-red-500">{error}</div>;
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
    return <div className="container mx-auto p-8 text-center text-red-500">Error: Could not find a matching solver. Please check the solver catalog.</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-2">AI-Guided Decision Review</h1>
        <p className="text-lg text-gray-600 mb-8">
          {!solverInputContract 
            ? "The AI has analyzed your goal and proposed a path. Review the trade-offs and select a path to prepare it for execution."
            : "The solver input has been prepared based on your selection. Review the details below before proceeding to execution."
          }
        </p>
        
        {/* Step 1: Selection */}
        {!solverInputContract && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-8">
                <RecommendationCard 
                    solver={recommendedSolver}
                    confidence={confidence}
                    reasoning={reasoningSummary}
                    recommendation={recommendation}
                    onSelect={() => handleSelectAndPrepare(recommendedSolver)}
                />
                
                <AlternativeCard 
                    solver={alternativeSolver}
                    reasoning={recommendation.classicalFitRationale} 
                    onSelect={() => handleSelectAndPrepare(alternativeSolver)}
                />
            </div>
        )}

        {/* Step 2: Review Prepared Input */}
        {loading && selectedSolver && !solverInputContract && (
            <div className="text-center p-8">Preparing input for <strong>{selectedSolver.name}</strong>...</div>
        )}

        {error && <div className="text-center p-4 my-4 bg-red-100 text-red-700 rounded-lg">{error}</div>}

        {solverInputContract && (
          <div>
            <SolverInputCard contract={solverInputContract} />
            
            <div className="mt-8 text-center">
              {solverInputContract.readinessStatus === 'ready' ? (
                <button 
                  onClick={handleExecuteSolver}
                  className="bg-indigo-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-indigo-700 transition duration-300 ease-in-out shadow-md flex items-center justify-center mx-auto"
                >
                  Proceed to Execution Setup
                  <ArrowRightIcon className="h-5 w-5 ml-2" />
                </button>
              ) : (
                <p className="text-gray-600">The input is not ready for execution. Please address the warnings above.</p>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default JobConfiguration;
