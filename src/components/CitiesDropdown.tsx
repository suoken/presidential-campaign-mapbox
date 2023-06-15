import { useEffect, useState } from 'react'
import { parse, ParseResult } from 'papaparse'
import { City } from './ControlPanel'

const CITIES =  '../../data/cities_all.csv'

interface CitySelectionProps {
    onAddCity: (city: City) => void
    selectedCities: City[]
}

const CitiesDropdown: React.FC<CitySelectionProps> = ({ onAddCity, selectedCities }) => { 
    const [currentCity, setCurrentCity] = useState<City | null>(null)
    const [cities, setCities] = useState<City[]>([])

    const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const currentCity = cities.find(c => c.City === e.target.value)
        if (currentCity && !selectedCities.find(city => city.City === currentCity.City)) {
            onAddCity(currentCity)
        }
        setCurrentCity(currentCity || null)
    }

    useEffect(() => {
        const fetchCities = () => {
            parse(CITIES, {
                header: true,
                download: true,
                delimiter: ',',
                complete: ((results: ParseResult<City>) => {
                    const cities: City[] = results.data
                    const sortedCities: City[] = cities.sort((a,b) => a.City.localeCompare(b.City))
                    setCities(sortedCities)
                })
            })
        }
        fetchCities();
    }, [])
    
    return (
        <div>
            <select value={currentCity ? currentCity.City : ''} onChange={handleCityChange}>
                <option value=''>Select a city</option>
                {cities.map((city, index) => <option key={index} value={city.City}>{city.City}, {city.State}</option>)}
            </select>
        </div>
    )
}

export default CitiesDropdown