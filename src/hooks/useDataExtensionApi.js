import React, { createContext, useContext, useState } from "react";
import { apiService } from "../services/apiService";
import { mockApiService } from "../services/mockApiService";
import { useApiState } from "./useApiState";
import { useTestListConfig } from "./useTestListConfig";

const DataExtensionContext = createContext();

export const DataExtensionProvider = ({ children }) => {
  const { loading, error, setLoading, setError } = useApiState();
  const { selectedDe, setSelectedDe, setRequiredFields } = useTestListConfig();

  const service =
    process.env.NODE_ENV === "development" ? mockApiService : apiService;

  const fetchDe = async (deExternalKey) => {
    setLoading(true);
    setSelectedDe((prev) => null);
    try {
      const response = await service.getDataExtension(deExternalKey);
      setSelectedDe(response.dataExtension);
      setRequiredFields(
        response.dataExtension.fields.filter(
          (field) =>
            field.IsRequired &&
            field.Name !== response.dataExtension.sendableDeField
        )
      );
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const value = {
    selectedDe,
    loading,
    error,
    fetchDe,
  };

  return (
    <DataExtensionContext.Provider value={value}>
      {children}
    </DataExtensionContext.Provider>
  );
};

export const useDataExtensionApi = () => {
  const context = useContext(DataExtensionContext);

  if (!context) {
    throw new Error(
      "useDataExtensionApi must be used within a DataExtensionProvider"
    );
  }

  return context;
};
