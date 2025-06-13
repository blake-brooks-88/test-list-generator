import { useState } from "react";
import { apiService } from "../services/apiService";
import { mockApiService } from "../services/mockApiService";
import { useApiState } from "./useApiState"

export const useDataExtensionApi = () => {
    const { loading, error, setLoading, setError } = useApiState();
    const [prodDataExtension, setProdDataExtension] = useState(null);

    const service = process.env.NODE_ENV === 'development' ? mockApiService : apiService;

    const fetchDe = async (deExternalKey) => {
        setLoading(true);
        try {
            const response = await service.getDataExtension(deExternalKey);
            setProdDataExtension(response.dataExtension)
            setLoading(false)
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    }

    return { prodDataExtension, loading, error, fetchDe }
}