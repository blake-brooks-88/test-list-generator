import React from "react";
import { useProgress } from "../../hooks/useProgress";
import StepIcon from "../steps/StepIcon";

function ProgressIndicator() {
  const { currentStep, maxSteps } = useProgress();
  const stepsArray = Array(maxSteps)
    .fill(1)
    .map((e, i) => e + i * 1);
  return (
    <div className="flex">
      {stepsArray.map((step) =>
        step < maxSteps ? (
          <div className="flex justify-center items-center">
            <StepIcon
              key={step}
              stepNumber={step}
              isComplete={step < currentStep}
              isActive={step === currentStep}
              isInactive={step > currentStep}
            />
            <div
              className={`
                    h-1 
                    w-16 
                    ${step < currentStep ? "bg-primary-600" : "bg-mygray-200 "}
                    mx-4
                    `}
            ></div>
          </div>
        ) : (
          <StepIcon
            key={step}
            stepNumber={step}
            isComplete={step < currentStep}
            isActive={step === currentStep}
            isInactive={step > currentStep}
          />
        )
      )}
    </div>
  );
}

export default ProgressIndicator;
