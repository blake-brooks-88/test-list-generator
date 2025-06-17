import React, { createContext, useState, useContext, useCallback } from "react";

const TestListConfigContext = createContext();

export const TestListConfigProvider = ({ children }) => {
  const [mode, setModeState] = useState(null);
  const [selectedDe, setSelectedDeState] = useState(null);
  const [variantFields, setVariantFields] = useState([]);
  const [testDataFields, setTestDataFields] = useState([]);
  const [varianceData, setVarianceData] = useState("");
  const [testData, setTestData] = useState("");
  const [requiredVarianceFields, setRequiredVarianceFields] = useState([]);
  const [requiredTestDataFields, setRequiredTestDataFields] = useState([]);

  const clearAll = useCallback(() => {
    setSelectedDeState(null);
    setModeState(null);
    setVariantFields([]);
    setTestDataFields([]);
    setRequiredVarianceFields([]);
    setRequiredTestDataFields([]);
    setVarianceData("");
    setTestData("");
  }, []);

  const setMode = useCallback(
    (newMode) => {
      if (newMode === null) {
        clearAll();
      }
      if (newMode === "proof") {
        setVariantFields([]);
        setRequiredVarianceFields([]);
        setVarianceData("");
        setModeState(newMode);
      } else {
        setModeState(newMode);
      }
    },
    [clearAll]
  );

  const setSelectedDe = useCallback((de) => {
    setSelectedDeState(de);
    setVariantFields([]);
    setTestDataFields([]);
    setRequiredVarianceFields([]);
    setRequiredTestDataFields([]);
    setVarianceData("");
    setTestData("");
  }, []);

  const selectVariantField = (field) => {
    if (!variantFields.includes(field)) {
      setVariantFields((prev) => [...prev, field]);
    }

    if (!requiredVarianceFields.includes(field) && field.IsRequired) {
      setRequiredVarianceFields((prev) => [...prev, field]);
    }
  };

  const selectTestDataField = (field) => {
    if (!testDataFields.includes(field)) {
      setTestDataFields((prev) => [...prev, field]);
    }

    if (!requiredTestDataFields.includes(field) && field.IsRequired) {
      setRequiredTestDataFields((prev) => [...prev, field]);
    }
  };

  const unselectVariantField = (field) => {
    if (variantFields.includes(field)) {
      setVariantFields((prev) => prev.filter((f) => f !== field));
    }

    if (requiredTestDataFields.includes(field)) {
      setRequiredTestDataFields((prev) => prev.filter((f) => f !== field));
    }
  };

  const unselectTestDataField = (field) => {
    if (testDataFields.includes(field)) {
      setTestDataFields((prev) => prev.filter((f) => f !== field));
    }

    if (requiredTestDataFields.includes(field)) {
      setRequiredTestDataFields((prev) => prev.filter((f) => f !== field));
    }
  };

  const clearVariantFields = () => {
    setVariantFields([]);
    setRequiredVarianceFields([]);
  };

  const clearTestDataFields = () => {
    setTestDataFields([]);
    setRequiredTestDataFields([]);
  };

  const isVariantFieldSelected = (field) => {
    return variantFields.includes(field);
  };

  const isTestDataFieldSelected = (field) => {
    return testDataFields.includes(field);
  };

  return (
    <TestListConfigContext.Provider
      value={{
        selectedDe,
        variantFields,
        testDataFields,
        varianceData,
        testData,
        mode,
        requiredVarianceFields,
        requiredTestDataFields,
        selectVariantField,
        selectTestDataField,
        unselectVariantField,
        unselectTestDataField,
        clearVariantFields,
        clearTestDataFields,
        isVariantFieldSelected,
        isTestDataFieldSelected,
        setSelectedDe,
        clearAll,
        setMode,
        setVarianceData,
        setTestData,
      }}
    >
      {children}
    </TestListConfigContext.Provider>
  );
};

export const useTestListConfig = () => {
  const context = useContext(TestListConfigContext);
  if (!context) {
    throw new Error(
      "useTestListConfig must be used within TestListConfigProvider"
    );
  }
  return context;
};
