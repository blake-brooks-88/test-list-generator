import React from "react";

function StepIcon({ stepNumber, isActive, isInactive }) {
  return (
    <div
      className={`
            text-center 
            rounded-full 
            w-12 
            h-12 
            items-center 
            justify-center 
            flex 
            bg-primary-500
            ${isInactive ? "bg-mygray-200 text-mygray-800" : null}
            `}
    >
      {stepNumber}
    </div>
  );
}

export default StepIcon;
