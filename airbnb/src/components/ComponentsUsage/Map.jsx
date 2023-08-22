import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  const mapContainerStyle = {
    width: '500px',
    height: '350px',
  };

  const apiKey = 'AIzaSyBqgmtOHmr9SGauS7g3QjEsvHmMhGDy96Y'; // Replace with your actual Google Maps API key
  const address = 'Ergenekon Mahallesi, Cumhuriyeti Cad. Itır Apt, No:179, Kat:5, D:10, 34373 Şişli/İstanbul';

  const [coordinates, setCoordinates] = useState({
    lat: 41, // Default latitude
    lng: 28.95, // Default longitude
  });

console.log(address)

const options = {
    mapId: "b181cac70f27f5e6",
    clickableIcons: false,
  };
  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={mapContainerStyle} options={options} center={coordinates} zoom={10}>
        <Marker position={coordinates} icon={null} />
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;


