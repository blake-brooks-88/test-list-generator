import React, { useEffect, useState } from "react";
import StepHeading from "../StepHeading";
import ConfigurationSummary from "./ConfigurationSummary";
import OutputOptions from "./OutputOptions";
import SummaryCard from "./SummaryCard";
import { createDataExtensionConfig } from "../../../services/dataExtensionFormatter";
import { useTestListConfig } from "../../../hooks/useTestListConfig";
import { useDataExtensionApi } from "../../../hooks/useDataExtensionApi";

const ErrorAlert = ({ error, onDismiss }) => {
  if (!error) return null;

  return (
    <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-red-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">
            Error Creating Data Extension
          </h3>
          <div className="mt-2 text-sm text-red-700">
            <p>{error}</p>
          </div>
        </div>
        <div className="ml-auto pl-3">
          <div className="-mx-1.5 -my-1.5">
            <button
              onClick={onDismiss}
              className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100"
            >
              <span className="sr-only">Dismiss</span>
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const SuccessAlert = ({ message, onDismiss }) => {
  if (!message) return null;

  return (
    <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg
            className="h-5 w-5 text-green-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm font-medium text-green-800">{message}</p>
        </div>
        <div className="ml-auto pl-3">
          <button
            onClick={onDismiss}
            className="inline-flex bg-green-50 rounded-md p-1.5 text-green-500 hover:bg-green-100"
          >
            <span className="sr-only">Dismiss</span>
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

function ReviewGenerate() {
  const {
    selectedDe,
    outputDataExtensionName,
    varianceData,
    testData,
    variantFields,
    mode,
  } = useTestListConfig();

  const { createDe, overwriteDe, loading, error, clearError } =
    useDataExtensionApi();
  const [outputOption, setOutputOption] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [sampleLimit, setSampleLimit] = useState(null);

  const delay = (ms) => new Promise((res) => setTimeout(res, ms));

  useEffect(() => {
    if (error) {
      setSuccessMessage(null);
    }
  }, [error]);

  const generateSampleOutput = () => {
    const sourceDe = {
      Name: selectedDe.name,
      CustomerKey: selectedDe.externalKey,
    };

    const outputDataExtensionExternalKey = createNewDataExtension();
    const targetDe = {
      Name: outputDataExtensionName,
      CustomerKey: outputDataExtensionExternalKey,
    };

    let resultRows = [];
    let testDataRows = [];
    const testDataProperties = testData.forEach((testRow) => {
      testDataRows = [];
      for (const testField in testRow) {
        testDataRows.push({
          Name: testField,
          Value: testRow[testField],
        });
      }
      resultRows.push(testDataRows);
    });

    const sampleListConfig = {
      sourceDataExtension: sourceDe,
      targetDe: targetDe,
      varianceFields: variantFields,
      testData: resultRows,
      allFields: selectedDe.fields,
      maxRecords: sampleLimit,
    };
    return sampleListConfig;
    // call API to build sample list
    // createSampleList(sampleListConfig)
    // create query activity
    // build query
    // run query
    // delete query
  };

  const generateProofingOutput = async () => {
    clearError();

    try {
      const outputDataExtensionExternalKey = await createNewDataExtension();
      await delay(3000);

      const outputRows = generateProofingRows();

      const proofingOutput = {
        CustomerKey: outputDataExtensionExternalKey,
        Rows: outputRows,
      };

      overwriteDe(proofingOutput);
    } catch (err) {
      console.error("Failed to generate proofing output:", err);
    }
  };

  const generateProofingRows = () => {
    let resultRows = [];

    varianceData.forEach((variantRow) => {
      testData.forEach((testRow) => {
        let properties = [];

        for (const variantField in variantRow) {
          properties.push({
            Name: variantField,
            Value: variantRow[variantField],
          });
        }

        for (const testField in testRow) {
          properties.push({
            Name: testField,
            Value: testRow[testField],
          });
        }

        resultRows.push(properties);
      });
    });

    return resultRows;
  };

  const createNewDataExtension = async () => {
    const sendableField = selectedDe.fields.find(
      (field) => field.Name === selectedDe.sendableDeField
    );
    const newDe = createDataExtensionConfig(
      outputDataExtensionName,
      selectedDe.fields,
      selectedDe.folderId,
      sendableField
    );

    createDe(newDe);
    setSuccessMessage("Data Extension created successfully!");
    return newDe.CustomerKey;
  };

  const handleDismissError = () => {
    clearError();
  };

  const handleDismissSuccess = () => {
    setSuccessMessage(null);
  };

  return (
    <div>
      <StepHeading
        title="Review & Generate"
        subHeading="Review your configuration and choose your desired output"
      />

      <ErrorAlert error={error} onDismiss={handleDismissError} />

      <SuccessAlert message={successMessage} onDismiss={handleDismissSuccess} />

      <SummaryCard summaryHeader={`Configuration Summary`}>
        <ConfigurationSummary />
      </SummaryCard>
      <SummaryCard summaryHeader={`Output Options`}>
        <OutputOptions
          selectOutputOption={setOutputOption}
          outputType={"create"}
        />
      </SummaryCard>

      {mode === "proof" ? (
        <button
          onClick={generateProofingOutput}
          disabled={loading}
          className={`bg-primary-600 text-primary-50 p-4 disabled:opacity-50 disabled:cursor-not-allowed ${
            loading ? "animate-pulse" : ""
          }`}
        >
          {loading ? "Creating..." : "Generate Proofing"}
        </button>
      ) : (
        <button
          onClick={generateSampleOutput}
          disabled={loading}
          className={`bg-accent-500 text-accent-50 p-4 disabled:opacity-50 disabled:cursor-not-allowed ml-2`}
        >
          {loading ? "Creating..." : "Generate Sample"}
        </button>
      )}
    </div>
  );
}

export default ReviewGenerate;
