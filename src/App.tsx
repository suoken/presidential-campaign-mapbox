import Map, { GeolocateControl, FullscreenControl, NavigationControl, ScaleControl } from 'react-map-gl'
import './App.css'

const TOKEN = 'pk.eyJ1Ijoic3Vva2VuIiwiYSI6ImNsaXA2aDlubzAzZ3czZHF2N2JweW1mejMifQ.oTJy_GGp_vg0F_bt1oWzHA';

function App() {

  return (
    <Map
      initialViewState={{
        latitude: 40,
        longitude: -100,
        zoom: 3.5,
        bearing: 0,
        pitch: 0
      }}
      mapStyle='mapbox://styles/mapbox/streets-v12'
      mapboxAccessToken={TOKEN}
    >
      <GeolocateControl position="top-left" />
      <FullscreenControl position="top-left" />
      <NavigationControl position="top-left" />
      <ScaleControl />
    </Map>
  )
}

export default App
