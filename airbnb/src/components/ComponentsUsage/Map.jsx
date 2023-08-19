import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const Map = ({ lat, lng }) => {
    const mapContainerStyle = {
        width: '100%',
        height: '400px',
    };

    const center = {
        lat,
        lng,
    };

    return (
        <LoadScript googleMapsApiKey="YOUR_API_KEY">
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15}>
                <Marker position={center} />
            </GoogleMap>
        </LoadScript>
    );
};

export default Map;