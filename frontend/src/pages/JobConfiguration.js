import React from 'react';
import MethodSelectionCard from '../components/job/MethodSelectionCard';

// Mock data for recommended and alternative methods
const recommendedMethod = {
  name: "Quantum-Inspired Annealer",
  description: "A powerful solver for complex optimization problems, ideal for uncovering non-obvious solutions in large datasets.",
  reason: "Your goal of 'Financial Risk Analysis' involves finding the optimal balance across many variables, which is a perfect use case for this method."
};

const alternativeMethod = {
  name: "Classical Monte Carlo Simulation",
  description: "A standard, robust method for simulating a wide range of possibilities to assess risk.",
  reason: "This is a well-understood, fast, and reliable method for risk analysis, though it may not explore the solution space as comprehensively as the annealer."
};

function JobConfiguration() {
  return (
    <div>
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold">Select Your Analysis Method</h1>
        <p className="text-lg text-gray-600 mt-2">The AI has recommended a method based on your goals, but you have the final say.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MethodSelectionCard method={recommendedMethod} isRecommended={true} />
        <MethodSelectionCard method={alternativeMethod} isRecommended={false} />
      </div>
    </div>
  );
}

export default JobConfiguration;
