import React, { createContext, useContext, useState } from "react";
import { apiService } from "../services/apiService";
import { mockApiService } from "../services/mockApiService";
import { useApiState } from "./useApiState";
import { useTestListConfig } from "./useTestListConfig";

const DataExtensionContext = createContext();

export const DataExtensionProvider = ({ children }) => {
  const { loading, error, setLoading, setError, clearError } = useApiState();
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

  const createSamples = async (sampleListConfig) => {
    setLoading(true);
    try {
      const response = await service.createSampleList(sampleListConfig);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const createDe = async (deDetails) => {
    setLoading(true);
    try {
      const result = await service.createDataExtension(deDetails);
      setLoading(false);
      return result;
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const overwriteDe = async (data) => {
    setLoading(true);
    try {
      const result = await service.overWriteDataExtension(data);
      setLoading(false);
      return result;
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
    createDe,
    clearError,
    overwriteDe,
    createSamples,
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
