import React from 'react'

function AppContainer({ children }) {
    return (
        <div className="flex flex-col">
            {children}
        </div>
    )
}

export default AppContainer