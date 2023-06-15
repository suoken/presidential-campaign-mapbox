import React, { useState } from 'react'
import CitiesDropdown from './CitiesDropdown'
import SelectedCities from './SelectedCities'
import CalculateDistance from './CalculateDistance'

export type City = {
    City: 'string',
    State: 'string',
    Latitude: 'string',
    Longitude: 'string',
}

const ControlPanel: React.FC = () => {
    const [selectedCities, setSelectedCities] = useState<City[]>([])
    
    const handleAddCity = (city: City) => {
        setSelectedCities(prevCities => [...prevCities, city])
    }

    const handleRemoveCity = (city: City) => {
        setSelectedCities(prevCities => prevCities.filter(c => c.City !== city.City))
    }

    return (
        <div className='control-panel'>
            <h3>Presidental Campaign Trail</h3>
            <p>Add cities and press calculate to determine the shortest route to each city</p>
            <CitiesDropdown onAddCity={handleAddCity} selectedCities={selectedCities}/>
            <SelectedCities cities={selectedCities} onRemoveCity={handleRemoveCity}/>
            { selectedCities.length != 0 && (<CalculateDistance selectedCities={selectedCities} />) }
        </div>
    )
}

export default ControlPanel