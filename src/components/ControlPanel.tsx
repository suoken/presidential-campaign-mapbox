import React, { useState } from 'react'
import CitiesDropdown from './CitiesDropdown'
import SelectedCities from './SelectedCities'
import CalculateDistance from './CalculateDistance'

export interface City {
    City: 'string',
    State: 'string',
    Latitude: 'string',
    Longitude: 'string',
}

export interface CalculateReturn { 
    route: City[]
    distance: number
}

const ControlPanel: React.FC = () => {
    const [selectedCities, setSelectedCities] = useState<City[]>([]) 
    const [totalDistance, setTotalDistance] = useState<number>()
    
    const handleAddCity = (city: City) => {
        setSelectedCities(prevCities => [...prevCities, city])
    }

    const handleRemoveCity = (city: City) => {
        setSelectedCities(prevCities => prevCities.filter(c => c.City !== city.City))
    }

    const handleCityShortestRoute = (cityRoute: CalculateReturn) => {
        const { route, distance } = cityRoute
        setTotalDistance(distance)
        setSelectedCities(route)
    }

    return (
        <div className='control-panel'>
            <h3>Presidental Campaign Trail</h3>
            <p>Add cities and press calculate to determine the shortest route to each city</p>
            <CitiesDropdown onAddCity={handleAddCity} selectedCities={selectedCities}/>
            <SelectedCities cities={selectedCities} onRemoveCity={handleRemoveCity}/>
            { totalDistance && <div className='total-distance'><b>Total distance: {totalDistance.toFixed(2)} km</b></div>}
            { selectedCities.length != 0 && (<CalculateDistance selectedCities={selectedCities} onCalculate={handleCityShortestRoute}/>) }
        </div>
    )
}

export default ControlPanel