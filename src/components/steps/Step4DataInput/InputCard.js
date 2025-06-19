import React, { useState, useRef, useCallback } from "react";
import { focusedAnimatedBorder } from "../../../constants/constants";
import { useTestListConfig } from "../../../hooks/useTestListConfig";
import { parseInput } from "../../../services/csvParser";
import Error from "../../common/messages/Error";
import Success from "../../common/messages/Success";

function InputCard({ type, fields, requiredFields }) {
  const [currentInput, setCurrentInput] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [isValid, setIsValid] = useState(false);
  const timeoutRef = useRef(null);
  const { setVarianceData, setTestData, selectedDe } = useTestListConfig();

  let inputHeaderText;
  let inputDescriptionText;

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

  const validateInput = useCallback(
    (csvRows) => {
      const errors = [];

      // make sure they haven't pasted in any fields that match

      const requriedArray = type === "variance" ? requiredFields : fields;

      if (!csvRows || csvRows.length === 0) {
        errors.push("No data provided");
        return { isValid: false, errors };
      }

      const headerRow = csvRows[0];

      const inputFields = Object.keys(headerRow);

      if (inputFields.length === 0) {
        errors.push("No data was found");
        return { isValid: false, errors };
      }

      const normalizedInputFields = inputFields.map((field) =>
        field.toString().trim().toLowerCase()
      );

      const normalizedRequiredFields = requriedArray.map((field) =>
        field.Name.toString().trim().toLowerCase()
      );

      const missingFields = [];
      normalizedRequiredFields.forEach((requiredField, index) => {
        if (!normalizedInputFields.includes(requiredField)) {
          missingFields.push(requriedArray[index].Name);
        }
      });

      if (missingFields.length > 0) {
        errors.push(`Missing required fields: ${missingFields.join(", ")}`);
      }

      const duplicateFields = [];
      const fieldCounts = {};

      normalizedInputFields.forEach((field, index) => {
        if (fieldCounts[field]) {
          if (!duplicateFields.includes(inputFields[index])) {
            duplicateFields.push(inputFields[index]);
          }
        } else {
          fieldCounts[field] = 1;
        }
      });

      if (duplicateFields.length > 0) {
        errors.push(
          `Duplicate field names found: ${duplicateFields.join(", ")}`
        );
      }

      const dataRowErrors = [];

      csvRows.slice(1).forEach((row, rowIndex) => {
        requiredFields.forEach((requiredField) => {
          const matchingField = inputFields.find(
            (field) =>
              field.toString().trim().toLowerCase() ===
              requiredField.Name.toString().trim().toLowerCase()
          );

          if (
            matchingField &&
            (!row[matchingField] || row[matchingField].toString().trim() === "")
          ) {
            dataRowErrors.push(
              `Row ${rowIndex + 2}: Missing value for required field '${
                requiredField.Name
              }'`
            );
          }
        });
      });

      if (dataRowErrors.length > 0) {
        errors.push(...dataRowErrors.slice(0, 5));
        if (dataRowErrors.length > 5) {
          errors.push(
            `... and ${dataRowErrors.length - 5} more data validation errors`
          );
        }
      }

      return {
        isValid: errors.length === 0,
        errors,
      };
    },
    [requiredFields]
  );

  const handleInput = (event) => {
    const inputValue = event.target.value;
    setCurrentInput(inputValue);

    type === "variance" ? setVarianceData(null) : setTestData(null);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!inputValue.trim()) {
      setValidationErrors([]);
      setIsValid(false);
      return;
    }

    timeoutRef.current = setTimeout(() => {
      try {
        const result = parseInput(inputValue);
        const validation = validateInput(result.data);

        setValidationErrors(validation.errors);
        setIsValid(validation.isValid);

        if (validation.isValid) {
          type === "variance"
            ? setVarianceData(result.data)
            : setTestData(result.data);
        }
      } catch (error) {
        setValidationErrors([`Parse error: ${error.message}`]);
        setIsValid(false);
      }
    }, 1000);
  };

  const generatePlaceholderText = (fieldDisplayArray) => {
    if (fieldDisplayArray.length > 0) {
      const fieldNames = fieldDisplayArray
        .map((field) => field.Name)
        .join("\t");
      const sampleData = fieldDisplayArray.map(() => "sample_value").join("\t");
      return `${fieldNames}\n${sampleData}\n${sampleData}\n${sampleData}`;
    } else {
      return "Field1\tField2\tField3\nsample_value1\tsample_value2\tsample_value3\nsample_value1\tsample_value2\tsample_value3\nsample_value1\tsample_value2\tsample_value3";
    }
  };

  const fieldDisplayArray = type === "variance" ? requiredFields : fields;
  const placeholderText = generatePlaceholderText(fieldDisplayArray);

  return (
    <div className="flex flex-col border mb-6 border-coolgray-200 rounded-lg bg-white">
      <div className="flex flex-col p-4 border-b">
        <p className="font-semibold mb-2">{inputHeaderText} Data</p>
        <p className="text-sm mb-2 text-coolgray-600">{inputDescriptionText}</p>
        {requiredFields.length > 0 && (
          <p className="text-sm text-coolgray-600">
            Required fields:{" "}
            <span className="font-mono text-primary-600">
              {fieldDisplayArray.map((field, index) => (
                <span key={field.Name}>
                  {field.Name}
                  {index < fieldDisplayArray.length - 1 ? ", " : ""}
                </span>
              ))}
            </span>
          </p>
        )}
      </div>

      <div className="flex flex-col p-4">
        <textarea
          onChange={handleInput}
          className={`resize-y placeholder:text-coolgray-300 font-mono min-h-32 flex-1 rounded-lg ${focusedAnimatedBorder} ${
            currentInput.trim() && !isValid
              ? "border-danger-300 focus:border-danger-500"
              : ""
          }`}
          value={currentInput}
          placeholder={placeholderText}
        />
        {currentInput.trim() && (
          <div className="mt-4">
            {isValid ? (
              <Success>
                <p className="text-sm text-green-600 flex items-center">
                  <span className="mr-1">✓</span>
                  Valid input format
                </p>
              </Success>
            ) : validationErrors.length > 0 ? (
              <Error>
                <div className="text-sm text-red-600">
                  <p className="font-medium mb-1">Validation errors:</p>
                  <ul className="list-disc list-inside space-y-1">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </Error>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}

export default InputCard;
