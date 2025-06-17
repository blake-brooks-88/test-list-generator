import React from "react";

function MainContent({ children }) {
  return (
    <div className={`flex flex-1 ml-64 flex-col h-screen `}>{children}</div>
  );
}

export default MainContent;
