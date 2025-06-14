import React from "react";

function MainContent({ children }) {
  return <div className={`flex flex-col flex-1`}>{children}</div>;
}

export default MainContent;
