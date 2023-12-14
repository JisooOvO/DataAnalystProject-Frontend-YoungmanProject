import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const containerStyle = {
    width: '1600px',
    height: '800px'
};

const center = {
    lat: 35.1796,
    lng: 129.0756
};

const position = {
    lat: 35.0911,
    lng: 129.0875
}
const Map = () => {


    // const API_KEY = "AIzaSyDae9p1BxuYqFHmtbznJyJnfHrZDUBs1wI"

    return (
        <LoadScript
            googleMapsApiKey={API_KEY}
        >
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
            />
            <Marker
                position={position}
                icon="⛵"
            />

        </LoadScript>
    )
}

export default Map
