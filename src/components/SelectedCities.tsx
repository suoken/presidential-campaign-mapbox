import React from 'react'
import { City } from './ControlPanel'

interface SelectedCitiesProps {
    cities: City[]
    onRemoveCity: (city: City) => void
}

const SelectedCities: React.FC<SelectedCitiesProps> = ({ cities, onRemoveCity }) => {
    const endingCity = cities[0]
    
    return (
        <ul className='selected-cities-list'>
            {cities.map((city, index) => (
                <li key={index} className='city'>
                    { index == 0 && <div>{index + 1}. {city.City}, {city.State}</div> }
                    { index > 0 && <div>{index + 1}. {city.City}, {city.State}</div>}
                    { index == cities.length - 1 && <div><b>End: </b> {endingCity.City}, {endingCity.State}</div>}
                    <button className='remove-btn' onClick={() => onRemoveCity(city)}>Remove</button>
                </li>
            ))}
        </ul>
    )
}

export default SelectedCities
