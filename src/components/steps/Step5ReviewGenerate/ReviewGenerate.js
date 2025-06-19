import React, { useEffect, useState } from "react";
import StepHeading from "../StepHeading";
import ConfigurationSummary from "./ConfigurationSummary";
import OutputOptions from "./OutputOptions";
import SummaryCard from "./SummaryCard";
import { createDataExtensionConfig } from "../../../services/dataExtensionFormatter";
import { useTestListConfig } from "../../../hooks/useTestListConfig";

function ReviewGenerate() {
  const { selectedDe, outputDataExtensionName } = useTestListConfig();
  const [outputOption, setOutputOption] = useState(null);

  const generateOutput = () => {
    if (outputOption === "create") {
      const sendableField = selectedDe.fields.find(
        (field) => field.Name === selectedDe.sendableDeField
      );
      console.log(
        createDataExtensionConfig(
          outputDataExtensionName,
          selectedDe.fields,
          1234,
          sendableField
        )
      );
    } else if (outputOption === "overwrite") {
    }
  };
  // proof
  // - ouptut Option
  //   - create new
  //     - get DE name
  //       - validate name
  //     - search DE name to make sure it doesn't already exist
  //     - already exists?
  //       - yes
  //         - error
  //       - no
  //         - create Data Extension with provided name
  //         - return external key and all leverage fetch DE to get all of the results

  //   - existing
  //     - output DE = external key of source DE
  //   - then
  //     - create row of variant data for each row of test data
  //   - then
  //     - API call to overwrite the outputData Extension with the rows of data generated from above

  // sample
  // - create new only option
  //     - get DE name
  //       - validate name
  //     - search DE name to make sure it doesn't already exist
  //     - already exists?
  //       - yes
  //         - error
  //       - no
  //         - create Data Extension with provided name
  //         - return external key and all leverage fetch DE to get all of the results
  // - then
  //   - get test fields

  return (
    <div>
      <StepHeading
        title="Review & Generate"
        subHeading="Review your configuration and choose your desired output"
      />
      <SummaryCard summaryHeader={`Configuration Summary`}>
        <ConfigurationSummary />
      </SummaryCard>
      <SummaryCard summaryHeader={`Output Options`}>
        <OutputOptions
          selectOutputOption={setOutputOption}
          outputType={outputOption}
        />
      </SummaryCard>
      <button
        onClick={generateOutput}
        className={`bg-primary-600 text-primary-50 p-4`}
      >
        Generate
      </button>
    </div>
  );
}
export default ReviewGenerate;
