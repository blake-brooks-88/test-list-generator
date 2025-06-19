import React from "react";
import { useTestListConfig } from "../../hooks/useTestListConfig";

function SidebarSummary() {
  const { mode } = useTestListConfig();
  return (
    <div className="">
      <p className="uppercase text-xs text-coolgray-400">Summary</p>
      <p className="">
        Mode <span>{mode}</span>
      </p>
    </div>
  );
}

export default SidebarSummary;
