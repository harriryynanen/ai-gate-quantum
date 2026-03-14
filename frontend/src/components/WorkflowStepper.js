import React from 'react';
import './WorkflowStepper.css'; // Updated CSS file reference

const WorkflowStepper = ({ steps, currentStep }) => {
  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <ol className="workflow-stepper">
      {steps.map((step, index) => {
        const isCompleted = index < currentStepIndex;
        const isActive = index === currentStepIndex;

        return (
          <React.Fragment key={step}>
            <li className={`step ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
              <div className="step-indicator">
                {isCompleted ? '✓' : index + 1}
              </div>
              <span className="step-label">{step}</span>
            </li>
            {index < steps.length - 1 && (
              <div className={`step-connector ${isCompleted ? 'completed' : ''}`}></div>
            )}
          </React.Fragment>
        );
      })}
    </ol>
  );
};

export default WorkflowStepper;
