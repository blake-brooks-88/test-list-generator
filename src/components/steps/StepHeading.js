import React from "react";

function StepHeading({ title, subHeading }) {
  return (
    <div className="mb-6">
      <h1 className={`text-2xl mb-1 font-bold text-secondary-700`}>{title}</h1>
      <p className={`text-secondary-500`}>{subHeading}</p>
    </div>
  );
}

export default StepHeading;
