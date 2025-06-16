import React from "react";
import StepHeading from "../StepHeading";
import DataExtensionSearchCard from "./DataExtensionSearchCard";

function DataExtensionSearch() {
  return (
    <div>
      <StepHeading
        title="Select Data Extension"
        subHeading="Enter the external key of your Data Extension"
      />
      <DataExtensionSearchCard />
    </div>
  );
}

export default DataExtensionSearch;
