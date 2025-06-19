import React, { useEffect, useState } from "react";
import { useProgress } from "../../../hooks/useProgress";
import { useTestListConfig } from "../../../hooks/useTestListConfig";
import StepHeading from "../StepHeading";
import InputCard from "./InputCard";

function DataInput() {
  const {
    variantFields,
    testDataFields,
    mode,
    requiredFields,
    requiredTestDataFields,
    testData,
    varianceData,
  } = useTestListConfig();
  const { setCanProceedToNextStep } = useProgress();

  useEffect(() => {
    if (mode === "proof" && testData && varianceData) {
      setCanProceedToNextStep(true);
    } else if (mode === "sample" && testData) {
      setCanProceedToNextStep(true);
    } else {
      setCanProceedToNextStep(false);
    }
  }, [testData, varianceData]);
  return (
    <>
      <StepHeading
        title="Input Test Data"
        subHeading="Enter test data that will replace production values in the selected fields."
      />
      {mode === "proof" ? (
        <InputCard
          requiredFields={requiredFields.filter(
            (requiredField) =>
              !testDataFields.some(
                (testField) => testField.Name === requiredField.Name
              )
          )}
          type={"variance"}
          fields={variantFields}
        />
      ) : null}
      <InputCard
        type={"testData"}
        requiredFields={requiredTestDataFields}
        fields={testDataFields}
      />
    </>
  );
}

export default DataInput;
