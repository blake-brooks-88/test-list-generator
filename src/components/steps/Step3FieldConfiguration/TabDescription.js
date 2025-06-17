import React from "react";

function TabDescription({ mode }) {
  return (
    <div className="bg-secondary-50 rounded-lg p-4 mb-4">
      {mode === "variance" ? (
        <div>
          <h3 className="text-sm font-medium text-secondary-900 mb-1">
            Variance Fields
          </h3>
          <p className="text-sm text-secondary-600">
            These fields create different test scenarios. Each unique
            combination generates separate test cases.
            <span className="font-medium"> Example:</span> Select "CustomerType"
            and "Region" to test Premium/California vs Basic/Texas scenarios.
          </p>
        </div>
      ) : (
        <div>
          <h3 className="text-sm font-medium text-secondary-900 mb-1">
            Test Data Fields
          </h3>
          <p className="text-sm text-secondary-600">
            These fields will be replaced with safe test values to protect real
            customer data.
            <span className="font-medium"> Example:</span> Replace real emails
            with test@example.com addresses.
          </p>
        </div>
      )}
    </div>
  );
}

export default TabDescription;
