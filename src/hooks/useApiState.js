const { useContext, useState, createContext } = require("react");

const ApiStateContext = createContext();

export const useApiState = () => {
    const [loading, setLoadingState] = useState(false);
    const [error, setErrorState] = useState(null);

    const setLoading = (isLoading) => {
        setLoadingState(isLoading)
        if (isLoading) {
            setErrorState(null);
        }
    }

    const setError = (errorMessage) => {
        setErrorState(errorMessage)
        setLoadingState(false)
    }

    const clearError = () => {
        setErrorState(null)
    }

    return { loading, error, setLoading, setError, clearError };
}