import React from "react";

function Logo() {
  return (
    <div className="flex items-center pb-4 ">
      <div className="flex w-10 justify-center mr-3 items-center h-10 text-secondary-50 bg-primary-600 rounded-xl">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-flask-conical-icon lucide-flask-conical"
        >
          <path d="M14 2v6a2 2 0 0 0 .245.96l5.51 10.08A2 2 0 0 1 18 22H6a2 2 0 0 1-1.755-2.96l5.51-10.08A2 2 0 0 0 10 8V2" />
          <path d="M6.453 15h11.094" />
          <path d="M8.5 2h7" />
        </svg>
      </div>
      <p className="font-semibold">Test Generator</p>
    </div>
  );
}

export default Logo;
