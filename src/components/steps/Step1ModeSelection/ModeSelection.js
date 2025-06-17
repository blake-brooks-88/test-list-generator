import React, { useEffect } from "react";
import { useProgress } from "../../../hooks/useProgress";
import { useTestListConfig } from "../../../hooks/useTestListConfig";
import StepHeading from "../StepHeading";
import ModeSelectionCard from "./ModeSelectionCard";

function ModeSelection() {
  const { setMode, mode } = useTestListConfig();
  const { setCanProceedToNextStep } = useProgress();

  useEffect(() => {
    setCanProceedToNextStep(mode !== null);
  }, [mode]);

  const handleContainerClick = () => {
    setMode(null);
  };

  return (
    <div onClick={handleContainerClick} className={`h-full flex-grow`}>
      <StepHeading
        title="Choose Your Test Strategy"
        subHeading="What type of test list would you like to generate? Your choice will determine the source of your data."
      />
      <div className="flex gap-6">
        <ModeSelectionCard
          title="Generate Proofing List"
          description="Create synthetic test data using a template structure for safe proofing without real data."
          type="proof"
        />
        <ModeSelectionCard
          title="Sample Production Data"
          description="Extract real data combinations from a live Data Extension to test actual scenarios."
          type="sample"
        />
      </div>
    </div>
  );
}

export default ModeSelection;
