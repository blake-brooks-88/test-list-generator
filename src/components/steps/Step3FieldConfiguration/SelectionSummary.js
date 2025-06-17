import React from "react";

function SelectionSummary({
  generatorMode,
  variantCount,
  testDataCount,
  validConfiguration,
}) {
  const variantFieldWord = variantCount > 1 ? " fields" : " field";
  const testDataFieldWord = testDataCount > 1 ? " fields" : " field";
  return (
    <div className="mt-6 pt-6 border-t border-secondary-200">
      <div className="flex items-center justify-between text-sm">
        <div className="text-secondary-600">
          {generatorMode === "sample" ? (
            <>
              <span className="font-medium">{variantCount}</span> variance
              {variantFieldWord},
            </>
          ) : null}
          <span className="font-medium ml-1">{testDataCount}</span> test data
          {testDataFieldWord} selected
        </div>
        <div className="text-primary-600 font-medium">
          {validConfiguration
            ? "✓ Valid configuration"
            : "Select fields to continue"}
        </div>
      </div>
    </div>
  );
}

export default SelectionSummary;
