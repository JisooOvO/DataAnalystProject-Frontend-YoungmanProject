import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {Stadia_StamenToner} from "./OpenStreetMapDesign.js"

function OsMap() {
  const position = [34, 129]; 

  return (
    <MapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url={Stadia_StamenToner["url"]}
        attribution={Stadia_StamenToner["attribution"]}
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
