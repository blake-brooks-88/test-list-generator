import React from "react";

function AppContainer({ children }) {
  return (
    <div className="flex flex-row min-w-full  min-h-screen h-full">
      {children}
    </div>
  );
}

export default AppContainer;
