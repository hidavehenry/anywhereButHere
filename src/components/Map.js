import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import React from 'react';
// import { Icon } from 'leaflet';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import React from 'react';


const Map = (props) => {

  return (
<<<<<<< HEAD
    <div>
      <MapContainer className="mapid" center={props.userCoordsR} zoom={13} scrollWheelZoom={false}>
=======
    <div className="mapClass">
      <MapContainer className="mapid" center={[43.64, -79.417]} zoom={15} scrollWheelZoom={false}>
>>>>>>> 4598cc3a0671cfe80b85b8ab392e98a345d66bb6
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Marker position={props.userCoordsR}>
        <Popup>
          You're here!
        </Popup>
      </Marker>

      {props.destination.map( (place) => {
        return(
          <Marker 
            key={place.id} 
            position={[place.place.geometry.coordinates[1], place.place.geometry.coordinates[0]]}
            >
            <Popup>
            {place.name}
            </Popup>
          </Marker>
            )
        } )}
      </MapContainer>
    </div>
  )
}

export default Map
