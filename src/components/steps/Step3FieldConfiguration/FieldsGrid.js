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

  const handleFieldToggle = (field) => {
    if (mode === "variance") {
      if (sendableField && field.Name === sendableField) {
        return;
      }

      if (isVariantFieldSelected(field)) {
        unselectVariantField(field);
      } else {
        selectVariantField(field);
      }
    } else {
      if (
        sendableField &&
        field.Name === sendableField &&
        isTestDataFieldSelected(field)
      ) {
        return;
      }

      if (isTestDataFieldSelected(field)) {
        unselectTestDataField(field);
      } else {
        selectTestDataField(field);
      }
    }
  };

  if (fields.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-sm text-coolgray-500">No fields available.</p>
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
              ? isTestDataFieldSelected(field)
              : isVariantFieldSelected(field)
          }
          isSelected={
            mode === "variance"
              ? isVariantFieldSelected(field)
              : isTestDataFieldSelected(field)
          }
          onToggle={() => handleFieldToggle(field)}
        />
      ))}
    </div>
  );
}

export default FieldsGrid;
