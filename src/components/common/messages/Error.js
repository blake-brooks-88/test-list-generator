import React from "react";
import Ban from "../icons/Ban";
import MessageCard from "./MessageCard";

function Error({ children }) {
  return (
    <MessageCard
      textColor={`text-danger-800`}
      backgroundColor={`bg-danger-50`}
      border={`border border-danger-200`}
      icon={<Ban />}
    >
      {children}
    </MessageCard>
  );
}

export default Error;

// has header row
// has data
// all of the required fields are present
// all of the required fields have a value present
