import React from 'react'
import { City, CalculateReturn } from './ControlPanel'

interface CalculateDistanceProps {
    selectedCities: City[]
    onCalculate: (city: CalculateReturn) => void
}
  
 // Helper function to calculate the distance between two coordinates using the Haversine formula
 // taken from https://github.com/thealmarques/haversine-distance-typescript/blob/master/index.ts
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const earthRadius = 6371 // Radius of the Earth in kilometers
    const dLat = degreesToRadians(lat2 - lat1)
    const dLon = degreesToRadians(lon2 - lon1)
    const halfChordLength =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const angularDistance = 2 * Math.atan2(Math.sqrt(halfChordLength), Math.sqrt(1 - halfChordLength))
    const distance = earthRadius * angularDistance
    return distance
  }
  
// Function to convert degrees to radians
const degreesToRadians = (degrees: number): number => {
    return degrees * (Math.PI / 180)
}
  
// Function to find the optimal route and minimize the total distance
// A version of the traveling salesman problem
const findOptimalRoute = (cities: City[], onCalculate: (city: CalculateReturn) => void): void => {
    const startCity = cities[0]
    let optimalRoute: City[] = []
    let minDistance = Infinity
  
    // Helper function to find all possible permutations of cities
    const permute = (cities: City[], currentRoute: City[], currentDistance: number): void => {
      if (cities.length === 0) {
        const totalDistance = currentDistance + calculateDistance(
          Number(currentRoute[currentRoute.length - 1].Latitude),
          Number(currentRoute[currentRoute.length - 1].Longitude),
          Number(startCity.Latitude),
          Number(startCity.Longitude)
        )
        if (totalDistance < minDistance) {
          minDistance = totalDistance
          optimalRoute = [...currentRoute]
        }
      } else {
        for (let i = 0; i < cities.length; i++) {
          const city = cities[i]
          const remainingCities = cities.filter((_, index) => index !== i)
          const distance = currentDistance + calculateDistance(
            Number(currentRoute[currentRoute.length - 1].Latitude),
            Number(currentRoute[currentRoute.length - 1].Longitude),
            Number(city.Latitude),
            Number(city.Longitude)
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
  
    onCalculate({ route: optimalRoute, distance: minDistance})
}

const CalculateDistance: React.FC<CalculateDistanceProps> = ({ selectedCities, onCalculate }) => {
    return (
        <button className='calculate-btn' onClick={() => findOptimalRoute(selectedCities, onCalculate)}>Calculate</button>
    )
}

export default CalculateDistance
  