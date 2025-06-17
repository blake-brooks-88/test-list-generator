import React from "react";
import { useTestListConfig } from "../../../hooks/useTestListConfig";
import StepHeading from "../StepHeading";
import InputCard from "./InputCard";

function DataInput() {
  const { variantFields, testDataFields, mode } = useTestListConfig();
  return (
    <>
      <StepHeading
        title="Input Test Data"
        subHeading="Enter test data that will replace production values in the selected fields."
      />
      {mode === "proof" ? (
        <InputCard type={"variance"} fields={variantFields} />
      ) : null}
      <InputCard type={"testData"} fields={testDataFields} />
    </>
  );
}

export default DataInput;
