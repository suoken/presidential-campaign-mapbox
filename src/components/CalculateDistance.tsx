import React from 'react'
import { City } from './ControlPanel'

interface CalculateDistanceProps {
    selectedCities: City[]
    onCalculate: (city: City[]) => void
}
  
 // Helper function to calculate the distance between two coordinates using the Haversine formula
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const earthRadius = 6371 // Radius of the Earth in kilometers
    const dLat = degreesToRadians(lat2 - lat1)
    const dLon = degreesToRadians(lon2 - lon1)
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = earthRadius * c
    return distance
  }
  
  // Function to convert degrees to radians
const degreesToRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180)
}
  
// Function to find the optimal route and minimize the total distance
const findOptimalRoute = (cities: City[], onCalculate: (city: City[]) => void): { route: City[]; distance: number } => {
    const startCity = cities[0]
    let optimalRoute: City[] = []
    let minDistance = Infinity
  
    // Helper function to find all possible permutations of cities
    const permute = (cities: City[], currentRoute: City[], currentDistance: number): void => {
      if (cities.length === 0) {
        const totalDistance = currentDistance + calculateDistance(
          parseInt(currentRoute[currentRoute.length - 1].Latitude),
          parseInt(currentRoute[currentRoute.length - 1].Longitude),
          parseInt(startCity.Latitude),
          parseInt(startCity.Longitude)
        );
        if (totalDistance < minDistance) {
          minDistance = totalDistance
          optimalRoute = [...currentRoute]
        }
      } else {
        for (let i = 0; i < cities.length; i++) {
          const city = cities[i]
          const remainingCities = cities.filter((_, index) => index !== i)
          const distance = currentDistance + calculateDistance(
            parseInt(currentRoute[currentRoute.length - 1].Latitude),
            parseInt(currentRoute[currentRoute.length - 1].Longitude),
            parseInt(city.Latitude),
            parseInt(city.Longitude)
          )
          permute(
            remainingCities,
            [...currentRoute, city],
            distance
          )
        }
      }
    }
  
    permute(cities.slice(1), [startCity], 0)
    onCalculate(optimalRoute)

    return { route: optimalRoute, distance: minDistance }
}

const CalculateDistance: React.FC<CalculateDistanceProps> = ({ selectedCities, onCalculate }) => {
    return (
        <button onClick={() => findOptimalRoute(selectedCities, onCalculate)}>Calculate</button>
    )
}

export default CalculateDistance
  