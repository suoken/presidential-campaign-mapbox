import React from 'react'
import CitiesDropdown from './CitiesDropdown'

const ControlPanel:React.FC = () => {
    return (
        <div className="control-panel">
            <h3>Presidental Campaign Trail</h3>
            <p>Add cities and press calculate to determine the shortest route to each city</p>
            <CitiesDropdown />
        </div>
    )
}

export default ControlPanel