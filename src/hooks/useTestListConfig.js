import React, { createContext, useState, useContext } from 'react'

const TestListConfigContext = createContext();

export const TestListConfigProvider = ({ children }) => {
    const [mode, setMode] = useState(null);
    const [selectedDe, setSelectedDeState] = useState(null);
    const [variantFields, setVariantFields] = useState([]);
    const [testDataFields, setTestDataFields] = useState([]);
    const [varianceData, setVarianceData] = useState('')
    const [testData, setTestData] = useState('')

    const selectField = (field) => {
        if (!isFieldSelected(field)) {
            setVariantFields(prev => [...prev, field])
        }
    }

    const unselectField = (field) => {
        if (isFieldSelected(field)) {
            setVariantFields(prev => prev.filter(f => f !== field))
        }
    }

    const clearVariantFields = () => {
        setVariantFields([]);
    }

    const setSelectedDe = (userSelectedDe) => {
        clearAll();
        setSelectedDeState(userSelectedDe);
    }

    const isFieldSelected = (field) => {
        return variantFields.includes(field);
    }

    const clearAll = () => {
        setSelectedDeState(null);
        clearVariantFields();
    }


    return (
        <TestListConfigContext.Provider
            value={{
                selectedDe,
                variantFields,
                selectField,
                unselectField,
                clearVariantFields,
                setSelectedDe,
                isFieldSelected,
                clearAll,
            }}>
            {children}
        </TestListConfigContext.Provider>
    )
}

export const useTestListConfig = () => {
    const context = useContext(TestListConfigContext);
    if (!context) {
        throw new Error('useProdDataExtension must be used within ProdDataExtensionProvider')
    }
    return context;
}