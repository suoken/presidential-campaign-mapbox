import React from 'react'
import Map, { GeolocateControl, FullscreenControl, NavigationControl, ScaleControl } from 'react-map-gl'
import ControlPanel from './components/ControlPanel'
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

const App:React.FC = () => {
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
      </Map>
      <ControlPanel />
    </>
  )
}

export default App
