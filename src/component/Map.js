import { GoogleMap, LoadScript } from "@react-google-maps/api";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const containerStyle = {
    width: '400px',
    height: '400px'
};

const center = {
    lat: 35.1796,
    lng: 129.0756
};
const Map = () => {


    const API_KEY = "AIzaSyDae9p1BxuYqFHmtbznJyJnfHrZDUBs1wI"

    return (
      <LoadScript
        googleMapsApiKey = {API_KEY}
      >
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
       />
        
      </LoadScript>
    )
}

export default Map
