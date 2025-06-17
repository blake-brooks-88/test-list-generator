import React, { useState } from "react";
import { focusedAnimatedBorder } from "../../../constants/constants";
import { useTestListConfig } from "../../../hooks/useTestListConfig";
import { parseInput } from "../../../services/csvParser";
function InputCard({ type, fields }) {
  const [currentInput, setCurrentInput] = useState(null);
  const { setVarianceData, setTestData } = useTestListConfig();
  let inputHeaderText;
  let inputDescriptionText;
  let timeoutID;
  if (type === "variance") {
    inputHeaderText = "Variance";
    inputDescriptionText =
      "These are the different value combinations that will create multiple test scenarios. Each unique row will generate a separate set of test records.";
  }
  if (type === "testData") {
    inputHeaderText = "Test";
    inputDescriptionText =
      "These are safe, non-production values that will replace sensitive customer information. Use fake emails, test phone numbers, and dummy personal data to prevent accidental sends to real customers.";
  }
  const handleInput = (event) => {
    clearTimeout(timeoutID);
    timeoutID = setTimeout(() => {
      console.log(parseInput(event.target.value));
    }, 1000);
  };
  return (
    <div className="flex flex-col border mb-6 border-secondary-200 rounded-lg bg-white">
      <div className="flex flex-col p-4 border-b">
        <p className="font-semibold mb-2">{inputHeaderText} Data</p>
        <p className="text-sm mb-2 text-secondary-600">
          {inputDescriptionText}
        </p>
        <p className="text-sm text-secondary-600">
          CSV format for fields:{" "}
          <span className="font-mono text-primary-600">
            {fields.map((field, index) =>
              index === fields.length - 1 ? <>{field} </> : <>{field}, </>
            )}
          </span>
        </p>
      </div>
      <div className="flex p-4 ">
        <textarea
          onChange={handleInput}
          className={`resize-y h-32 flex-1 rounded-lg ${focusedAnimatedBorder}`}
          value={currentInput}
        ></textarea>
      </div>
    </div>
  );
}

export default InputCard;
