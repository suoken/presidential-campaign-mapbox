import { useEffect, useState } from 'react'
import { parse } from 'papaparse'

const CITIES =  '../../data/cities_all.csv'

const CitiesDropdown = () => { 
    const [cities, setCities] = useState<string[]>([])
    const [selectedCity, setSelectedCity] = useState('')

    useEffect(() => {
        const fetchCities = () => {
            parse(CITIES, {
                header: true,
                download: true,
                delimiter: ',',
                complete: ((results) => {
                    console.log(results)
                    const cities:string[] = results.data.map((res:any) => res.City + ', ' + res.State)
                    setCities(cities.sort())
                })
            })
        }
        fetchCities();
    }, [])
    
    return (
        <select onChange={(e) => setSelectedCity(e.target.value)}>
            <option value=''>Select a city</option>
            {cities.map(city => <option key={city} value={city}>{city}</option>)}
        </select>
    )
}

export default CitiesDropdown