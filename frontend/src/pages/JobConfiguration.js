import React, { useState } from 'react';
import WorkflowStepper from '../components/WorkflowStepper';
import DataPreparation from './workflow/DataPreparation';
import PathRecommendation from './workflow/PathRecommendation'; // New component
import ChooseSolver from './workflow/ChooseSolver';
import ValidateData from './workflow/ValidateData';
// MapData is part of the DataPreparation flow now, so it's not a main step.

const JobConfiguration = () => {
  // Updated, more logical workflow steps
  const steps = [
    'Data Preparation',
    'Path Recommendation',
    'Solver Configuration',
    'Validate & Approve',
  ];
  const [currentStep, setCurrentStep] = useState(steps[0]);

  const currentStepIndex = steps.indexOf(currentStep);

  const goToNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStep(steps[currentStepIndex + 1]);
    }
  };

  const goToPreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStep(steps[currentStepIndex - 1]);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 'Data Preparation':
        return <DataPreparation />;
      case 'Path Recommendation':
        return <PathRecommendation />;
      case 'Solver Configuration':
        return <ChooseSolver />;
      case 'Validate & Approve':
        return <ValidateData />;
      default:
        return <p>Unknown step</p>;
    }
  };

  return (
    <div className="job-configuration-page">
      <h1>Configure New Job</h1>
      <WorkflowStepper steps={steps} currentStep={currentStep} />

      <div className="step-content">
        {renderCurrentStep()}
      </div>

      <div className="navigation-buttons">
        {currentStepIndex > 0 && (
          <button onClick={goToPreviousStep}>Back</button>
        )}
        {currentStepIndex < steps.length - 1 && (
          <button onClick={goToNextStep}>Next</button>
        )}
        {currentStepIndex === steps.length - 1 && (
          <button>Finish & Run</button>
        )}
      </div>
    </div>
  );
};

export default JobConfiguration;
