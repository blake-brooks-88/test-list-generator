import React, { createContext, useContext, useState } from "react";
import { apiService } from "../services/apiService";
import { mockApiService } from "../services/mockApiService";
import { useApiState } from "./useApiState";

const DataExtensionContext = createContext();

export const DataExtensionProvider = ({ children }) => {
  const { loading, error, setLoading, setError } = useApiState();
  const [prodDataExtension, setProdDataExtension] = useState(null);

  const service =
    process.env.NODE_ENV === "development" ? mockApiService : apiService;

  const fetchDe = async (deExternalKey) => {
    setLoading(true);
    setProdDataExtension((prev) => null);
    try {
      const response = await service.getDataExtension(deExternalKey);
      setProdDataExtension(response.dataExtension);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const value = {
    prodDataExtension,
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
