import React from "react";
import Checkmark from "../common/icons/Checkmark";

function StepIcon({
  stepNumber,
  isActive,
  isInactive,
  stepText,
  isComplete,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center p-2 rounded-md cursor-pointer transition-all duration-200 mb-2 ${
        isActive
          ? "bg-gradient-to-r flex-1 from-primary-50 to-info-50 text-primary-700 shadow-sm"
          : isComplete
          ? "text-secondary-600 flex-1 hover:bg-secondary-50"
          : "text-secondary-400 flex-1"
      }`}
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium mr-3 transition-all duration-200 ${
          isComplete
            ? "bg-gradient-to-br from-primary-600 to-info-600 text-white shadow-sm"
            : isActive
            ? "bg-gradient-to-br from-primary-600 to-info-600 text-white shadow-sm"
            : "bg-secondary-200 text-secondary-500"
        }`}
      >
        {isComplete ? <Checkmark /> : stepNumber}
      </span>
      <span className="text-sm font-medium">{stepText}</span>
    </div>
  );
}

export default StepIcon;
