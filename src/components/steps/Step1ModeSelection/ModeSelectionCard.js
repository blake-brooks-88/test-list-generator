import React from "react";
import { animatedBorderWithGlow } from "../../../constants/constants";
import { useTestListConfig } from "../../../hooks/useTestListConfig";
import DataBaseZap from "../../common/icons/DataBaseZap";
import NoteBookWithTabs from "../../common/icons/NoteBookWithTabs";

function ModeSelectionCard({ type, title, description }) {
  const { mode, setMode } = useTestListConfig();
  const isSelected = mode === type;

  const handleClick = (event) => {
    event.stopPropagation();
    setMode(type);
  };

  return (
    <div
      className={`
        flex-1 text-coolgray-600 p-6 flex flex-col border-2 
        cursor-pointer rounded-lg
        transition-all duration-300 ease-in-out
        ${
          isSelected
            ? `${animatedBorderWithGlow}   bg-gradient-to-br from-primary-50 via-info-50 to-primary-50 shadow-lg transform scale-105`
            : "border-coolgray-100 bg-white hover:bg-coolgray-50 hover:border-coolgray-200"
        }
      `}
      onClick={handleClick}
    >
      <div
        className={`
          w-12 h-12 mb-3 flex justify-center items-center rounded-lg
          transition-all duration-300 ease-in-out
          ${
            isSelected
              ? "bg-gradient-to-br from-primary-600 to-info-600 shadow-lg transform rotate-3"
              : "bg-coolgray-100 hover:bg-coolgray-200 hover:scale-110"
          }
        `}
      >
        <div
          className={`${
            isSelected ? "text-white" : "text-coolgray-600"
          } transition-colors duration-300`}
        >
          {type === "proof" ? <NoteBookWithTabs /> : <DataBaseZap />}
        </div>
      </div>
      <h3
        className={`text-lg font-semibold ${
          isSelected ? "text-coolgray-900" : "text-coolgray-700"
        } transition-colors duration-300`}
      >
        {title}
      </h3>
      <p
        className={`${
          isSelected ? "text-coolgray-700" : "text-coolgray-600"
        } transition-colors duration-300`}
      >
        {description}
      </p>
    </div>
  );
}

export default ModeSelectionCard;
