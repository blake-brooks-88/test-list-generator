import React from "react";

function OutputCard({ children, isActive, title, description, handleSelect }) {
  const getCardStyles = () => {
    if (isActive) {
      return "border-primary-600 bg-primary-50";
    }
    return "border-coolgray-100 hover:bg-coolgray-50";
  };
  return (
    <div
      className={`flex-col p-4 w-full border transition-all duration-200 mb-4  border-coolgray-100 rounded-lg`}
      onClick={handleSelect}
    >
      <p className={`font-semibold mb-1 text-coolgray-900`}>{title}</p>
      <p className={`text-coolgray-600`}>{description}</p>
      <>{children}</>
    </div>
  );
}

export default OutputCard;
