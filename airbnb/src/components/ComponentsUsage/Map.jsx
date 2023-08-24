import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

const Map = () => {
  const mapContainerStyle = {
    width: '500px',
    height: '350px',
  };

  const apiKey = ''; // Replace with your actual Google Maps API key // Use your server's URL
  const address = 'Ergenekon Mahallesi, Cumhuriyeti Cad. No:179, Istanbul, Turkey';
  const [officeLocation, setOfficeLocation] = useState('')
  useEffect(() => {
    // Make the initial request here
    axios.get('/geocode', {
      params: {
        address: address,
      },
    })
    .then((response) => {
      console.log(response.data);
      setOfficeLocation(response.data.results[0].geometry.location);
    })
    .catch((error) => {
      // Handle errors here
      console.error(error);
    });
  }, []); 

  const [coordinates, setCoordinates] = useState({
    lat: 41.0137, // Correct latitude
    lng: 28.970, // Correct longitude
  });

  
  const [office, setOffice] = useState(null);


  useEffect(() => {
    // Set a timer to update the office coordinates after 3 seconds
    const timer = setTimeout(() => {
      setOffice({
        lat: 41.0137, // Correct latitude
        lng: 28.970, // Correct longitude
      });
    }, 1000);
    // Clean up the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []); // Empty dependency array to run this effect only once, on mount

  const options = {
    mapId: "b181cac70f27f5e6",
    clickableIcons: true,
  };

  return (

    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap mapContainerStyle={mapContainerStyle} options={options} center={coordinates} zoom={10}>
        {office && <Marker position={officeLocation} />} {/* Render the Marker when office is not null */}
      </GoogleMap>
    </LoadScript>
  );
};

export default Map;
