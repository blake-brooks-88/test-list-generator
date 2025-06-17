import React from "react";

const IconSearch = (props) => (
  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" {...props}>
    <path
      fillRule="evenodd"
      d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
      clipRule="evenodd"
    />
  </svg>
);

function FieldSearch({ searchTerm, onSearchChange }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <IconSearch className="h-4 w-4 text-secondary-400" />
      </div>
      <input
        type="text"
        placeholder="Search fields..."
        className="pl-10 pr-4 py-2 border border-secondary-300 rounded-md text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500 w-64"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
  );
}

export default FieldSearch;
