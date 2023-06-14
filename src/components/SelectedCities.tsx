import React from 'react'
import { City } from './ControlPanel'

interface SelectedCitiesProps {
    cities: City[]
    onRemoveCity: (city: City) => void
}

const SelectedCities: React.FC<SelectedCitiesProps> = ({ cities, onRemoveCity }) => {
    return (
        <ul>
            {cities.map(city => (
                <li key={city.Latitude}>
                    {city.City + ', ' + city.State}
                    <button onClick={() => onRemoveCity(city)}>Remove</button>
                </li>
            ))}
        </ul>
    )
}

export default SelectedCities
