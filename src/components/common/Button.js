import React from "react";

function Button({
  content,
  icon,
  iconPosition = "right",
  buttonColor = "",
  textColor = "",
  borderColor = "",
  onClick,
  isActive = true,
  hoverColor,
}) {
  return (
    <button
      onClick={onClick}
      disabled={!isActive}
      className={`flex items-center gap-2 px-4 text-sm py-2 rounded-lg border 
        transition-all duration-150 ease-in-out 
        ${buttonColor} ${textColor} ${borderColor} 
        ${hoverColor} 
        ${!isActive ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {icon && iconPosition === "left" && icon}
      <span>{content}</span>
      {icon && iconPosition === "right" && icon}
    </button>
  );
}

export default Button;
