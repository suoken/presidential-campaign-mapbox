import React, { useMemo, useState } from 'react'
import Map, { GeolocateControl, FullscreenControl, NavigationControl, ScaleControl, Popup, Marker } from 'react-map-gl'
import ControlPanel, { City } from './components/ControlPanel'
import Pin from './components/Pin'
import './App.css'

const TOKEN = 'pk.eyJ1Ijoic3Vva2VuIiwiYSI6ImNsaXA2aDlubzAzZ3czZHF2N2JweW1mejMifQ.oTJy_GGp_vg0F_bt1oWzHA'

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
        <GeolocateControl position = "top-left" />
        <FullscreenControl position = "top-left" />
        <NavigationControl position = "top-left" />
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
      </Map>
      <ControlPanel onRouteUpdate={setCities} onClear={handlePinClear}/>
    </>
  )
}

export default App
