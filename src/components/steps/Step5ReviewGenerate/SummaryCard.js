import React from "react";

function SummaryCard({ children, summaryHeader }) {
  return (
    <div
      className={`flex mb-6 border border-coolgray-100 rounded-lg bg-white flex-col`}
    >
      <div className={`border-b p-4 text-lg border-coolgray-100`}>
        {summaryHeader}
      </div>
      <div className="p-4 text-sm">{children}</div>
    </div>
  );
}

export default SummaryCard;
