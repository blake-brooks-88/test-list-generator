import React from "react";
import { useProgress } from "../../hooks/useProgress";
import Button from "../common/Button";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function AppFooter() {
  const { canProceedToNextStep, nextStep, previousStep, currentStep, maxStep } =
    useProgress();

  const confirmMessage = "✓ Ready to continue";
  const pendingMessage = "Complete this step to continue";
  return (
    <footer
      className={`border-t px-4  border-secondary-200 align-bottom h-18 flex justify-between items-center`}
    >
      <Button
        content={`Back`}
        buttonColor={`bg-white`}
        icon={<ChevronLeft size={16} />}
        iconPosition="left"
        textColor={`text-secondary-700`}
        borderColor={`border-secondary-500`}
        onClick={previousStep}
        isActive={currentStep === 1 ? false : true}
      />
      <p
        className={`
            ${canProceedToNextStep ? "text-accent-500" : "text-secondary-400"}
        `}
      >
        {canProceedToNextStep ? confirmMessage : pendingMessage}
      </p>
      <Button
        content={`Next`}
        icon={<ChevronRight size={16} />}
        iconPosition="right"
        hoverColor={`hover:bg-primary-800`}
        buttonColor={`bg-gradient-to-r from-indigo-600 to-primary-500`}
        textColor={`text-primary-50`}
        onClick={nextStep}
        isActive={
          canProceedToNextStep && currentStep !== maxStep ? true : false
        }
      />
    </footer>
  );
}

export default AppFooter;
