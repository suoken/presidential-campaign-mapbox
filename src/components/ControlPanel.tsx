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

interface ControlPanelProps {
    onRouteUpdate: (city: City[]) => void
    onClear: () => void
}

const ControlPanel: React.FC<ControlPanelProps> = ({ onRouteUpdate, onClear }) => {
    const [selectedCities, setSelectedCities] = useState<City[]>([]) 
    const [totalDistance, setTotalDistance] = useState<number>(0)
    
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
        onRouteUpdate(route)
    }

    const handleClear = () => {
        setSelectedCities([])
        setTotalDistance(0)
        onClear()
    }

    return (
        <div className='control-panel'>
            <h3>Presidental Campaign Trail</h3>
            <p>Add cities and press calculate to determine the shortest route to each city</p>
            <CitiesDropdown selectedCities={selectedCities} onAddCity={handleAddCity} />
            <SelectedCities cities={selectedCities} onRemoveCity={handleRemoveCity}/>
            { totalDistance != 0 && <div className='total-distance'><b>Total distance: {totalDistance.toFixed(2)} km</b></div>}
            { selectedCities.length != 0 && (<CalculateDistance selectedCities={selectedCities} onCalculate={handleCityShortestRoute}/>) }
            { selectedCities.length != 0 && <button className='clear-btn' onClick={() => handleClear()}>Clear</button> }
        </div>
    )
}

export default ControlPanel