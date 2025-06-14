import React from "react";
import { STEPS_ARRAY } from "../../constants/constants";
import { useProgress } from "../../hooks/useProgress";
import StepIcon from "../steps/StepIcon";

function ProgressIndicator() {
  const { currentStep } = useProgress();

  return (
    <div className={`border-b py-6 border-slate-200`}>
      {STEPS_ARRAY.map((step, index) => (
        <div className="flex">
          <StepIcon
            key={index}
            stepNumber={index + 1}
            isComplete={index + 1 < currentStep}
            isActive={index + 1 === currentStep}
            isInactive={index + 1 > currentStep}
            stepText={step}
          />
        </div>
      ))}
    </div>
  );
}

export default ProgressIndicator;
