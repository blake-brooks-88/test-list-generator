import React, { createContext, useState, useContext } from "react";

const UseProgressContext = createContext();

export const ProgressProvider = ({ children }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [maxSteps] = useState(5);

  const nextStep = () => {
    if (currentStep < maxSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const goToStep = (stepNumber) => {
    if (canGoToStep(stepNumber)) {
      setCurrentStep(stepNumber);
    }
  };

  const canGoToStep = (stepNumber) => {
    if (stepNumber > currentStep) return false;
    if (stepNumber < 1) return false;
    if (stepNumber % 1 !== 0) return false;

    return true;
  };
  return (
    <UseProgressContext.Provider
      value={{
        currentStep,
        nextStep,
        previousStep,
        goToStep,
        maxSteps,
      }}
    >
      {children}
    </UseProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(UseProgressContext);
  if (!context) {
    throw new Error("useProgress must be used within ProgressProvider");
  }
  return context;
};
