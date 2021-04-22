import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

// import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
// import { Icon } from 'leaflet';
// import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import React from 'react';


import React from 'react'

const Map = (props) => {




  return (
    <div className="mapClass">
      <MapContainer className="mapid" center={[43.64, -79.417]} zoom={15} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
        {/* {props.destination.map(place => (
        <Marker 
        key={place.id} 
        position={place.geometry.coordinates}
        />
        ))} */}

        {/* {props.destination.map( (place) => {
            return(
              <Marker 
                key={place.id} 
                position={place.geometry.coordinates}
                />
            )
        } )} */}


        <Marker position={[43.64, -79.417]}>

        <Popup>
          You're here!
        </Popup>

      </Marker>
      </MapContainer>
    </div>
  )
}

export default Map
