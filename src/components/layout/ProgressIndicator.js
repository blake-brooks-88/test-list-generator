import React from "react";
import { STEPS_ARRAY } from "../../constants/constants";
import { useProgress } from "../../hooks/useProgress";
import StepIcon from "../steps/StepIcon";

function ProgressIndicator() {
  const { currentStep, goToStep } = useProgress();

  return (
    <div className={`border-b mb-4 py-6 border-coolgray-200`}>
      {STEPS_ARRAY.map((step, index) => (
        <div key={index} className="flex">
          <StepIcon
            stepNumber={index + 1}
            isComplete={index + 1 < currentStep}
            isActive={index + 1 === currentStep}
            isInactive={index + 1 > currentStep}
            stepText={step}
            onClick={() => goToStep(index + 1)}
          />
        </div>
      ))}
    </div>
  );
}

export default ProgressIndicator;
