import React from "react";
import { useProgress } from "../../hooks/useProgress";
import ModeSelection from "../steps/Step1ModeSelection/ModeSelection";
import DataExtensionSearch from "../steps/Step2DataExtensionSearch/DataExtensionSearch";
import FieldConfiguration from "../steps/Step3FieldConfiguration/FieldConfiguration";
import DataInput from "../steps/Step4DataInput/DataInput";
import ReviewGenerate from "../steps/Step5ReviewGenerate/ReviewGenerate";

function StepLayout() {
  const { currentStep } = useProgress();

  let currentComponent;
  switch (currentStep) {
    case 1:
      currentComponent = <ModeSelection />;
      break;
    case 2:
      currentComponent = <DataExtensionSearch />;
      break;
    case 3:
      currentComponent = <FieldConfiguration />;
      break;
    case 4:
      currentComponent = <DataInput />;
      break;
    case 5:
      currentComponent = <ReviewGenerate />;
      break;
  }
  return (
    <div className="flex-1 p-6 bg-secondary-50 overflow-y-auto">
      {currentComponent}
    </div>
  );
}

export default StepLayout;
