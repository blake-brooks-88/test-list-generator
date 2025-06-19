import React from "react";
import CheckmarkWithCircle from "../icons/CheckmarkWithCircle";
import MessageCard from "./MessageCard";

function Success({ children }) {
  return (
    <MessageCard
      textColor={`text-success-800`}
      backgroundColor={`bg-success-50`}
      border={`border border-success-200`}
      icon={<CheckmarkWithCircle />}
    >
      {children}
    </MessageCard>
  );
}

export default Success;
