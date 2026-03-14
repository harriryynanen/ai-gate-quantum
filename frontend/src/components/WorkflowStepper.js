import React from 'react';
import './WorkflowStepper.css';

const WorkflowStepper = ({ steps, currentStep }) => {
  const currentStepIndex = steps.indexOf(currentStep);

  return (
    <div className="workflow-stepper">
      {steps.map((step, index) => {
        let status = 'upcoming';
        if (index < currentStepIndex) {
          status = 'completed';
        } else if (index === currentStepIndex) {
          status = 'active';
        }

        return (
          <React.Fragment key={step}>
            <div className={`step ${status}`}>
              <div className="step-number">{index + 1}</div>
              <div className="step-label">{step}</div>
            </div>
            {index < steps.length - 1 && <div className="step-connector"></div>}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default WorkflowStepper;
