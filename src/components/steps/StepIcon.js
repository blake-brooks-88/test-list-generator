import React from "react";

function StepIcon({ stepNumber, isActive, isInactive, stepText, isComplete }) {
  return (
    <div
      className={`flex items-center p-2 rounded-md cursor-pointer transition-all duration-200 mb-2 ${
        isActive
          ? "bg-gradient-to-r flex-1 from-primary-50 to-info-50 text-primary-700 shadow-sm"
          : isComplete
          ? "text-secondary-600 hover:bg-secondary-50"
          : "text-secondary-400"
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
        {isComplete ? (
          <svg className="h-3 w-3" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
              clipRule="evenodd"
            />
          </svg>
        ) : (
          stepNumber
        )}
      </span>
      <span className="text-sm font-medium">{stepText}</span>
    </div>
  );
}

export default StepIcon;
