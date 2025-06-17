import React from "react";

function SideBar({ children }) {
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen p-6 bg-white border-r border-secondary-200 overflow-y-auto">
      {children}
    </aside>
  );
}

export default SideBar;
