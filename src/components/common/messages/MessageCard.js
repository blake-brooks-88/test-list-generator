import React from "react";

function MessageCard({ children, icon, textColor, backgroundColor, border }) {
  return (
    <div
      className={`
    p-6 flex text-sm rounded-lg ${backgroundColor} ${textColor} ${border}
  `}
    >
      <span className={`mr-3`}>{icon}</span>
      <div className={`flex flex-col`}>{children}</div>
    </div>
  );
}

export default MessageCard;
