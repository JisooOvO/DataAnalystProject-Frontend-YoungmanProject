import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {OpenStreetMap_Mapnik} from "./OpenStreetMapDesign.js"

function OsMap() {
  const position = [34, 129]; 

  return (
    <MapContainer center={position} zoom={5} style={{width : "100%", height : "100%"}}>
      <TileLayer
        url={OpenStreetMap_Mapnik["url"]}
        attribution={OpenStreetMap_Mapnik["attribution"]}
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
