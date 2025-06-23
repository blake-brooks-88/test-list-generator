import React, { useState } from "react";
import { useTestListConfig } from "../../../hooks/useTestListConfig";
import OutputCard from "./OutputCard";
import { focusedAnimatedBorder } from "../../../constants/constants";

function OutputOptions({ selectOutputOption, outputType }) {
  const { mode, setOutputDataExtensionName, selectedDe } = useTestListConfig();
  const [dataExtensionName, setDataExtensionName] = useState("");

  const handleInput = (event) => {
    setOutputDataExtensionName(null);
    // input doesn't contain special characters
    // chop off string after 255 characters
    setDataExtensionName((prev) => event.target.value);
    setOutputDataExtensionName(event.target.value);
  };

  const handleSelect = (type) => {
    selectOutputOption(type);
    setOutputDataExtensionName(selectedDe.name);
  };
  return (
    <>
      <OutputCard
        title={`Create New Data Extension`}
        description={`A new DE will be created in the same folder as the source DE with the generated data.`}
        isActive={true}
        type={`create`}
      >
        <div className={`w-full mt-3`}>
          <input
            type="text"
            onChange={handleInput}
            placeholder="Enter new Data Extension name..."
            value={dataExtensionName}
            className="w-full font-mono rounded-lg p-2 border transition-all duration-200 border-coolgray-100 focus:border-primary-300"
          />
        </div>
      </OutputCard>
    </>
  );
}
export default OutputOptions;
