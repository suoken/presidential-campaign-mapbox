import React, { useMemo, useState } from 'react'
import Map, { GeolocateControl, FullscreenControl, NavigationControl, ScaleControl, Popup, Marker, Source, Layer } from 'react-map-gl'
import ControlPanel, { City } from './components/ControlPanel'
import Pin from './components/Pin'
import './App.css'

const TOKEN = "PUT TOKEN HERE" 

// sets up a good zoom to see the entire USA 
const USA_INITIAL_VIEW_STATE = {
  latitude: 40,
  longitude: -100,
  zoom: 4.0,
  bearing: 0,
  pitch: 0
}

interface PopupInfo {
  city: string
  state: string
  longitude: string
  latitude: string
}

const App:React.FC = () => {
  const [popupInfo, setPopupInfo] = useState<PopupInfo | null>(null)
  const [cities, setCities] = useState<City[]>([])

  const handlePinClear = () => {
    setCities([])
    setPopupInfo(null)
  }

  const populateCoordinates = (cities: City[]) => {
    const coordinates = cities.map((city) => [Number(city.Longitude), Number(city.Latitude)])
    coordinates && coordinates.push([Number(cities[0].Longitude), Number(cities[0].Latitude)]) // connect line to last city
    const data = {
      type: 'Feature' as const,
      properties: {},
      geometry: {
        type: 'LineString' as const,
        coordinates,
      },
    }

    return data
  } 

  const lineData = cities.length != 0 && populateCoordinates(cities)

  const pins = useMemo(
    () => 
      cities.map((city, index) => (
        <Marker
          longitude={Number(city.Longitude)}
          latitude={Number(city.Latitude)}
          anchor='bottom'
          key={index}
          onClick={e => {
            e.originalEvent.stopPropagation()
            setPopupInfo({
              city: city.City,
              state: city.State,
              longitude: city.Longitude,
              latitude: city.Latitude
            })
          }}
        >
          <Pin number={index + 1}/>
        </Marker>
      )), [cities]
  )
  
  return (
    <>
      <Map
        initialViewState = { USA_INITIAL_VIEW_STATE }
        mapStyle = 'mapbox://styles/mapbox/streets-v12'
        mapboxAccessToken = { TOKEN }
      >      
        <GeolocateControl position = 'top-left' />
        <FullscreenControl position = 'top-left' />
        <NavigationControl position = 'top-left' />
        <ScaleControl />

        {pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div>
              {popupInfo.city}, {popupInfo.state}
            </div>
          </Popup>
        )}

      { lineData && 
        <Source id="route-data" type="geojson" data={lineData}>
          <Layer
            id="lineLayer"
            type="line"
            source="route-data"
            paint={{
              'line-color': '#FF0000', // Red line color
              'line-width': 2, // Line width in pixels
            }}
          />
        </Source>
      }

      </Map>
      <ControlPanel onRouteUpdate={setCities} onClear={handlePinClear}/>
    </>
  )
}

export default App
