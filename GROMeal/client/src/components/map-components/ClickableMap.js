import React from 'react';
import { MapContainer, TileLayer, useMapEvent } from 'react-leaflet';



function ClickableMap(props) {

    // When map is clicked on, make that the center, and call props.revGeocodeCb(latLng)
    function MoveMapOnClick() {
        let map = useMapEvent('click', (event) => {
            // Center map on click
            map.flyTo(event.latlng, map.getZoom());  // setView() looks much less cool ;-)
            // Make array of two numbers representing lat/lng
            let latLng = [Number(event.latlng.lat.toFixed(4)), Number(event.latlng.lng.toFixed(4))];
            // Call callback
            props.revGeocodeCb(latLng);
        });

        return null;
    }

    return (
        <MapContainer
            className="ClickableMap" 
            center={props.home} 
            zoom={props.zoom} 
            style={{ height: '500px' }} // you MUST specify map height, else it will be 0!
        >
            <TileLayer
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {/* Add a click handler to the map */}
            <MoveMapOnClick />
        </MapContainer>
    );
}

export default ClickableMap;