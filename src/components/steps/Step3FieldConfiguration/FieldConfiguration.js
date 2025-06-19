import React, { useState, useEffect, useMemo, useRef } from "react";
import { useTestListConfig } from "../../../hooks/useTestListConfig";
import StepHeading from "../StepHeading";
import SendableFieldInfo from "./SendableFieldInfo";
import FieldSelectionTabs from "./FieldSelectionTabs";
import FieldSearch from "./FieldSearch";
import TabDescription from "./TabDescription";
import FieldsGrid from "./FieldsGrid";
import SelectionSummary from "./SelectionSummary";
import { useProgress } from "../../../hooks/useProgress";

function FieldConfiguration() {
  const {
    variantFields,
    testDataFields,
    selectTestDataField,
    isTestDataFieldSelected,
    mode,
    selectedDe,
  } = useTestListConfig();

  const [fieldSelectionMode, setFieldSelectionMode] = useState(
    mode === "sample" ? "variance" : "testData"
  );
  const [searchTerm, setSearchTerm] = useState("");

  const hasAutoSelectedSendable = useRef(false);
  const { canProceedToNextStep, setCanProceedToNextStep } = useProgress();

  useEffect(() => {
    if (mode === "sample" && isVariantDataValid() && isTestDataValid()) {
      setCanProceedToNextStep(true);
    } else if (mode === "proof" && isTestDataValid()) {
      setCanProceedToNextStep(true);
    } else {
      setCanProceedToNextStep(false);
    }
  }, [testDataFields.length, variantFields.length]);

  useEffect(() => {
    const sendableField = selectedDe.fields.find(
      (field) => selectedDe.sendableDeField === field.Name
    );

    if (
      selectedDe?.sendableDeField &&
      !hasAutoSelectedSendable.current &&
      !isTestDataFieldSelected(sendableField)
    ) {
      selectTestDataField(sendableField);
      hasAutoSelectedSendable.current = true;
    }
  }, [
    selectedDe?.sendableDeField,
    isTestDataFieldSelected,
    selectTestDataField,
  ]);

  const fields = useMemo(() => selectedDe?.fields || [], [selectedDe?.fields]);

  const filteredFields = useMemo(() => {
    if (!searchTerm.trim()) return fields;
    return fields.filter(
      (field) =>
        field.Name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        field.FieldType.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm, fields]);

  const isTestDataValid = () => {
    return (
      (selectedDe.sendableDeField && testDataFields?.length > 1) ||
      (!selectedDe.sendableDeField && testDataFields?.length > 0)
    );
  };

  const isVariantDataValid = () => {
    return variantFields?.length > 0;
  };

  return (
    <>
      <StepHeading
        title="Configure Field Selection"
        subHeading="Choose which fields will create variations and which will contain test data."
      />

      <SendableFieldInfo sendableField={selectedDe?.sendableDeField} />

      <div className="bg-white rounded-lg border border-coolgray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <FieldSelectionTabs
            generatorMode={mode}
            currentMode={fieldSelectionMode}
            onModeChange={setFieldSelectionMode}
            variantCount={variantFields.length}
            testDataCount={testDataFields.length}
          />
          <FieldSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        <TabDescription mode={fieldSelectionMode} />

        <FieldsGrid
          fields={filteredFields}
          mode={fieldSelectionMode}
          sendableField={selectedDe?.sendableDeField}
        />

        <SelectionSummary
          validConfiguration={canProceedToNextStep}
          variantCount={variantFields.length}
          testDataCount={testDataFields.length}
          generatorMode={mode}
        />
      </div>
    </>
  );
}

export default FieldConfiguration;
