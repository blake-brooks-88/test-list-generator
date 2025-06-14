import React from "react";
import { useTestListConfig } from "../../hooks/useTestListConfig";

function SidebarSummary() {
  const { mode } = useTestListConfig();
  return (
    <div className="">
      <p className="uppercase text-xs text-secondary-400">Summary</p>
    </div>
  );
}

export default SidebarSummary;
