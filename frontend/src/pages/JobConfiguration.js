import React, { useState } from 'react';
import WorkflowStepper from '../components/WorkflowStepper';
import './JobConfiguration.css'; // New CSS for the wizard layout

// Placeholder components for each step
const FormulateProblem = () => <div>Content for Formulating Problem</div>;
const AssessReadiness = () => <div>Content for Assessing Readiness</div>;
const RecommendPath = () => <div>Content for Recommending Path</div>;
const MapSolver = () => <div>Content for Mapping Solver</div>;
const PrepareSolverInput = () => <div>Content for Preparing Solver Input</div>;
const Execute = () => <div>Content for Executing Job</div>;

const JobConfiguration = () => {
  // Aligned with the new, coherent workflow spine
  const steps = [
    'Formulate Problem',
    'Assess Readiness',
    'Recommend Path',
    'Map Solver',
    'Prepare Solver Input',
    'Execute',
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
      case 'Formulate Problem':
        return <FormulateProblem />;
      case 'Assess Readiness':
        return <AssessReadiness />;
      case 'Recommend Path':
        return <RecommendPath />;
      case 'Map Solver':
        return <MapSolver />;
      case 'Prepare Solver Input':
        return <PrepareSolverInput />;
      case 'Execute':
        return <Execute />;
      default:
        return <p>Unknown step</p>;
    }
  };

  return (
    <div className="job-configuration-wizard">
      <div className="wizard-header">
        <h1>Configure a New Analysis Job</h1>
        <p>Follow the steps to configure and launch your job.</p>
      </div>
      
      <WorkflowStepper steps={steps} currentStep={currentStep} />

      <div className="step-content">
        {renderCurrentStep()}
      </div>

      <div className="navigation-buttons">
        <button onClick={goToPreviousStep} disabled={currentStepIndex === 0}>
          Back
        </button>
        {currentStepIndex < steps.length - 1 ? (
          <button onClick={goToNextStep} className="primary">
            Next
          </button>
        ) : (
          <button className="primary">Finish & Run</button>
        )}
      </div>
    </div>
  );
};

export default JobConfiguration;
