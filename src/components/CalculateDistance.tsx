import React from 'react'
import { City } from './ControlPanel'


interface CalculateDistanceProps {
    selectedCities: City[]
}
  
//   // Sample input data
//   const cities: City[] = [
//     {
//         name: "Coon Rapids",
//         state: "Minnesota",
//         latitude: 45.1732394,
//         longitude: -93.3030063,
//     },
//     {
//         name: "Noblesville",
//         state: "Indiana",
//         latitude: 40.0455917,
//         longitude: -86.0085955,
//     },
//     {
//       name: "San Francisco",
//       state: "California",
//       latitude: 37.7749295,
//       longitude: -122.4194155,
//     },
//     {
//       name: "Aliso Viejo",
//       state: "California",
//       latitude: 33.5676842,
//       longitude: -117.7256083,
//     },
//     {
//       name: "Rapid City",
//       state: "South Dakota",
//       latitude: 44.0805434,
//       longitude: -103.2310149,
//     },
//     {
//       name: "Malden",
//       state: "Massachusetts",
//       latitude: 42.4250964,
//       longitude: -71.066163,
//     },
//     {
//       name: "Delray Beach",
//       state: "Florida",
//       latitude: 26.4614625,
//       longitude: -80.0728201,
//     },
//   ];
  
 // Helper function to calculate the distance between two coordinates using the Haversine formula
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const earthRadius = 6371; // Radius of the Earth in kilometers
    const dLat = degreesToRadians(lat2 - lat1);
    const dLon = degreesToRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;
    return distance;
  }
  
  // Function to convert degrees to radians
  function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
  }
  
  // Function to find the optimal route and minimize the total distance
  function findOptimalRoute(cities: City[]): { route: string[]; distance: number } {
    const startCity = cities[0];
    let optimalRoute: string[] = [];
    let minDistance = Infinity;
  
    // Helper function to find all possible permutations of cities
    function permute(cities: City[], currentRoute: City[], currentDistance: number): void {
      if (cities.length === 0) {
        const totalDistance = currentDistance + calculateDistance(
          parseInt(currentRoute[currentRoute.length - 1].Latitude),
          parseInt(currentRoute[currentRoute.length - 1].Longitude),
          parseInt(startCity.Latitude),
          parseInt(startCity.Longitude)
        );
        if (totalDistance < minDistance) {
          minDistance = totalDistance;
          optimalRoute = [...currentRoute.map(c => c.City), startCity.City];
        }
      } else {
        for (let i = 0; i < cities.length; i++) {
          const city = cities[i];
          const remainingCities = cities.filter((_, index) => index !== i);
          const distance = currentDistance + calculateDistance(
            parseInt(currentRoute[currentRoute.length - 1].Latitude),
            parseInt(currentRoute[currentRoute.length - 1].Longitude),
            parseInt(city.Latitude),
            parseInt(city.Longitude)
          );
          permute(
            remainingCities,
            [...currentRoute, city],
            distance
          );
        }
      }
    }
  
    permute(cities.slice(1), [startCity], 0);
  
    return { route: optimalRoute, distance: minDistance };
  }

  const CalculateDistance: React.FC<CalculateDistanceProps> = ({ selectedCities }) => {

    // Usage
    const { route, distance } = findOptimalRoute(selectedCities)
    
    // Print the optimal route and total distance
    console.log(route);
    console.log("Total Distance:", distance.toFixed(2));


    return (
        <div></div>
    )
  }

  export default CalculateDistance
  