import React from "react";

const IconCheck = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <path
      fillRule="evenodd"
      d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
      clipRule="evenodd"
    />
  </svg>
);

const IconPlus = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
  </svg>
);

function FieldCard({
  text,
  type,
  isSendableField,
  fieldSelectionMode,
  isSelected,
  onToggle,
  ownedByAnotherMode,
}) {
  const handleClick = () => {
    if (isSendableField && fieldSelectionMode === "variance") {
      return;
    }

    if (isSendableField && fieldSelectionMode === "testData" && isSelected) {
      return;
    }

    if (ownedByAnotherMode) return;

    onToggle();
  };

  const isDisabled =
    (isSendableField && fieldSelectionMode === "variance") ||
    (isSendableField && fieldSelectionMode === "testData" && isSelected) ||
    ownedByAnotherMode;

  const getCardStyles = () => {
    if (isDisabled) {
      return "bg-gray-50 border-gray-200 cursor-not-allowed opacity-60";
    }

    if (isSelected) {
      return "bg-primary-50 border-primary-300 cursor-pointer hover:bg-primary-100";
    }

    return "bg-white border-secondary-200 cursor-pointer hover:bg-secondary-50 hover:border-secondary-300";
  };

  const getIconStyles = () => {
    if (isDisabled) {
      return "text-gray-400";
    }

    if (isSelected) {
      return "text-primary-600";
    }

    return "text-secondary-400";
  };

  return (
    <div
      className={`
        rounded-lg border p-4 transition-all duration-200
        ${getCardStyles()}
      `}
      onClick={handleClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium text-secondary-900 truncate">
              {text}
            </h3>
            {isSendableField && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                Sendable
              </span>
            )}
          </div>
          <span className="flex gap-2 mt-1">
            <p className="text-xs text-secondary-500 ">{type}</p>
            {isSendableField && fieldSelectionMode === "variance" && (
              <div className="text-xs text-gray-500">
                Cannot be used for variance
              </div>
            )}
            {isSendableField &&
              fieldSelectionMode === "testData" &&
              isSelected && (
                <div className="text-xs text-primary-600">
                  Required for sends
                </div>
              )}
          </span>
        </div>

        <div className={`ml-3 flex-shrink-0 ${getIconStyles()}`}>
          {isSelected ? (
            <IconCheck className="h-5 w-5" />
          ) : (
            <IconPlus className="h-5 w-5" />
          )}
        </div>
      </div>
    </div>
  );
}

export default FieldCard;
