import React from 'react'
import { City } from './ControlPanel'

interface SelectedCitiesProps {
    cities: City[]
    onRemoveCity: (city: City) => void
}

const SelectedCities: React.FC<SelectedCitiesProps> = ({ cities, onRemoveCity }) => {
    return (
        <ul className='selected-cities-list'>
            {cities.map(city => (
                <li key={city.Latitude} className='city'>
                    {city.City}, {city.State}
                    <button className='remove-btn' onClick={() => onRemoveCity(city)}>Remove</button>
                </li>
            ))}
        </ul>
    )
}

export default SelectedCities
