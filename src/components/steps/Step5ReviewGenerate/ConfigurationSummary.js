import React from "react";
import { useTestListConfig } from "../../../hooks/useTestListConfig";

function ConfigurationSummary() {
  const {
    mode,
    selectedDe,
    testDataFields,
    variantFields,
    testData,
    varianceData,
  } = useTestListConfig();
  const modeText =
    mode === "proof" ? "Generate Proofing List" : "Generate Sample List";
  return (
    <dl className={`grid grid-cols-1 gap-4 sm:grid-cols-2`}>
      <div>
        <dt className={`text-coolgray-800 font-semibold`}>Mode</dt>
        <dl className={`text-coolgray-600`}>{modeText}</dl>
      </div>
      <div>
        <dt className={`text-coolgray-800 font-semibold`}>Data Extension</dt>
        <dl className={`text-coolgray-600 font-mono`}>{selectedDe.name}</dl>
      </div>
      {variantFields.length > 0 ? (
        <div>
          <dt className={`text-coolgray-800 font-semibold`}>Variance Fields</dt>
          <dl className={`text-coolgray-600 font-mono`}>
            {variantFields.map((field, index) => {
              <span key={field.Name}>
                {field.Name}
                {index < variantFields.length - 1 ? ", " : ""}
              </span>;
            })}
          </dl>
        </div>
      ) : null}
      <div>
        <dt className={`text-coolgray-800 font-semibold`}>Test Data Fields</dt>
        <dl className={`text-coolgray-600 font-mono`}>
          {testDataFields.map((field, index) => (
            <span key={field.Name}>
              {field.Name}
              {index < testDataFields.length - 1 ? ", " : ""}
            </span>
          ))}
        </dl>
      </div>
    </dl>
  );
}

export default ConfigurationSummary;
