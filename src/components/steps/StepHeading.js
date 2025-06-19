import React from "react";

function StepHeading({ title, subHeading }) {
  return (
    <div className="mb-6">
      <h1 className={`text-2xl mb-1 font-bold text-coolgray-900`}>{title}</h1>
      <p className={`text-coolgray-700`}>{subHeading}</p>
    </div>
  );
}

export default StepHeading;
