import React from "react";

function SideBar({ children }) {
  return (
    <aside className="w-64 min-h-screen p-6 bg-white border-r border-secondary-200">
      {children}
    </aside>
  );
}

export default SideBar;
