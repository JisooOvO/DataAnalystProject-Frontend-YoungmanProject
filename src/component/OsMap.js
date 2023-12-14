import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Esri_WorldImagery} from "./OpenStreetMapDesign.js"

function OsMap() {
  const position = [34, 129]; 

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url={Esri_WorldImagery["url"]}
        attribution={Esri_WorldImagery["attribution"]}
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default OsMap;
