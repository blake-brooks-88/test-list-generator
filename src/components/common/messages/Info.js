import React from "react";
import InfoIcon from "../icons/InfoIcon";
import MessageCard from "./MessageCard";

function Info({ children }) {
  return (
    <MessageCard
      textColor={`text-info-800`}
      backgroundColor={`bg-info-50`}
      border={`border border-info-600`}
      icon={<InfoIcon />}
    >
      {children}
    </MessageCard>
  );
}

export default Info;
