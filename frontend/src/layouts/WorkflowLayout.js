
import React, { useState } from 'react';
import DataUpload from '../components/Workflow/DataUpload';
import DataProfiling from '../components/Workflow/DataProfiling';
import ColumnMapping from '../components/Workflow/ColumnMapping';
import Validation from '../components/Workflow/Validation';
import './WorkflowLayout.css';

const steps = ['DataUpload', 'DataProfiling', 'ColumnMapping', 'Validation'];

const WorkflowLayout = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const renderStep = () => {
    switch (steps[currentStep]) {
      case 'DataUpload':
        return <DataUpload />;
      case 'DataProfiling':
        return <DataProfiling />;
      case 'ColumnMapping':
        return <ColumnMapping />;
      case 'Validation':
        return <Validation />;
      default:
        return <DataUpload />;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="workflow-layout">
      <div className="step-bar">
        <p>Step {currentStep + 1} of {steps.length}: {steps[currentStep]}</p>
      </div>
      <div className="workflow-body">
        {renderStep()}
      </div>
      <div className="workflow-footer">
        <button onClick={handleBack} disabled={currentStep === 0}>Back</button>
        <button onClick={handleNext} disabled={currentStep === steps.length - 1}>Next</button>
      </div>
    </div>
  );
};

export default WorkflowLayout;
