import React from "react";
import { useTestListConfig } from "../../../hooks/useTestListConfig";
import FieldCard from "./FieldCard";

function FieldsGrid({ fields, mode, sendableField }) {
  const {
    selectVariantField,
    selectTestDataField,
    unselectVariantField,
    unselectTestDataField,
    isVariantFieldSelected,
    isTestDataFieldSelected,
  } = useTestListConfig();

  const handleFieldToggle = (fieldName) => {
    if (mode === "variance") {
      if (sendableField && fieldName === sendableField) {
        return;
      }

      if (isVariantFieldSelected(fieldName)) {
        unselectVariantField(fieldName);
      } else {
        selectVariantField(fieldName);
      }
    } else {
      if (
        sendableField &&
        fieldName === sendableField &&
        isTestDataFieldSelected(fieldName)
      ) {
        return;
      }

      if (isTestDataFieldSelected(fieldName)) {
        unselectTestDataField(fieldName);
      } else {
        selectTestDataField(fieldName);
      }
    }
  };

  if (fields.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-secondary-500">No fields available.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {fields.map((field) => (
        <FieldCard
          key={field.Name}
          text={field.Name}
          type={field.FieldType}
          isSendableField={field.Name === sendableField}
          fieldSelectionMode={mode}
          ownedByAnotherMode={
            mode === "variance"
              ? isTestDataFieldSelected(field.Name)
              : isVariantFieldSelected(field.Name)
          }
          isSelected={
            mode === "variance"
              ? isVariantFieldSelected(field.Name)
              : isTestDataFieldSelected(field.Name)
          }
          onToggle={() => handleFieldToggle(field.Name)}
        />
      ))}
    </div>
  );
}

export default FieldsGrid;
