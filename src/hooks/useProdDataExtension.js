import React, { createContext, useState, useContext } from 'react'

const UseProdDataExtensionContext = createContext();

export const ProdDataExtensionProvider = ({ children }) => {

    return (
        <UseProdDataExtensionContext.Provider
            value={{
                selectedDe,
                selectedFields,
                selectField,
                unselectField,
                clearSelectedFields,
                setSelectedDe,
                isFieldSelected,
                clearAll,
            }}>
            {children}
        </UseProdDataExtensionContext.Provider>
    )
}

export const useProdDataExtension = () => {
    const context = useContext(UseProdDataExtensionContext);
    if (!context) {
        throw new Error('useProdDataExtension must be used within ProdDataExtensionProvider')
    }
    return context;
}