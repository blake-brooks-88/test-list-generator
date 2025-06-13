import React from 'react'

function AppHeader({ headerText, subheaderText }) {
    return (
        <div className="flex flex-col">
            <h1>{headerText}</h1>
            <p>{subheaderText}</p>
        </div>
    )
}

export default AppHeader