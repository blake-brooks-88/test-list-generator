import React, { createContext, useState, useContext } from 'react'

const TestListConfigContext = createContext();

export const TestListConfigProvider = ({ children }) => {
    const [mode, setMode] = useState(null);
    const [selectedDe, setSelectedDeState] = useState(null);
    const [variantFields, setVariantFields] = useState([]);
    const [testDataFields, setTestDataFields] = useState([]);
    const [varianceData, setVarianceData] = useState('')
    const [testData, setTestData] = useState('')

    const selectVariantField = (field) => {
        if (!variantFields.includes(field)) {
            setVariantFields(prev => [...prev, field])
        }
    }

    const selectTestDataField = (field) => {
        if (!testDataFields.includes(field)) {
            setTestDataFields(prev => [...prev, field])
        }
    }

    const unselectVariantField = (field) => {
        if (variantFields.includes(field)) {
            setVariantFields(prev => prev.filter(f => f !== field))
        }
    }

    const unselectTestDataField = (field) => {
        if (testDataFields.includes(field)) {
            setTestDataFields(prev => prev.filter(f => f !== field))
        }
    }

    const clearVariantFields = () => {
        setVariantFields([])
    }

    const clearTestDataFields = () => {
        setTestDataFields([])
    }

    const isVariantFieldSelected = (field) => {
        return variantFields.includes(field);
    }

    const isTestDataFieldSelected = (field) => {
        return testDataFields.includes(field);
    }

    const setSelectedDe = (userSelectedDe) => {
        clearAll();
        setSelectedDeState(userSelectedDe);
    }

    const clearAll = () => {
        setSelectedDeState(null);
        setMode(null)
        setVariantFields([]);
        setTestDataFields([]);
        setVarianceData('')
        setTestData('')
    }

    return (
        <TestListConfigContext.Provider
            value={{
                selectedDe,
                variantFields,
                testDataFields,
                varianceData,
                testData,
                mode,
                selectVariantField,
                selectTestDataField,
                unselectVariantField,
                unselectTestDataField,
                clearVariantFields,
                clearTestDataFields,
                isVariantFieldSelected,
                isTestDataFieldSelected,
                setSelectedDe,
                clearAll,
                setMode,
                setVarianceData,
                setTestData
            }}>
            {children}
        </TestListConfigContext.Provider>
    )
}

export const useTestListConfig = () => {
    const context = useContext(TestListConfigContext);
    if (!context) {
        throw new Error('useTestListConfig must be used within TestListConfigProvider')
    }
    return context;
}