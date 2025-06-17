import React from "react";

function FieldSelectionTabs({
  currentMode,
  onModeChange,
  variantCount,
  testDataCount,
  generatorMode,
}) {
  return (
    <div className="flex items-center">
      {generatorMode === "sample" ? (
        <button
          className={`px-3 py-2 text-sm font-medium rounded-l-lg transition-colors ${
            currentMode === "variance"
              ? "bg-primary-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => onModeChange("variance")}
        >
          Variance Fields
          <span
            className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
              currentMode === "variance"
                ? "bg-primary-500 text-white"
                : "bg-gray-200 text-gray-600"
            }`}
          >
            {variantCount}
          </span>
        </button>
      ) : null}

      <button
        className={`px-3 py-2 text-sm font-medium ${
          generatorMode === "proof" ? "rounded-lg" : "rounded-r-lg"
        } transition-colors ${
          currentMode === "testData"
            ? "bg-primary-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
        onClick={
          generatorMode === "proof" ? null : () => onModeChange("testData")
        }
      >
        Test Data Fields
        <span
          className={`ml-2 px-2 py-0.5 text-xs rounded-full ${
            currentMode === "testData"
              ? "bg-primary-500 text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          {testDataCount}
        </span>
      </button>
    </div>
  );
}

export default FieldSelectionTabs;
