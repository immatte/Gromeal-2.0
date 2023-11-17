import React, { useEffect, useState } from 'react';
import AddressForm from '../components/map-components/AddressForm';
import MarkerTable from '../components/map-components/MarkerTable';
import MarkerMap from '../components/map-components/MarkerMap';
import { geocode } from '../helpers/map-helpers/geo-opencage';



/*
A 'place' is an obj like this:
{
    latLng: [41.3874877, 2.1680296],
    input_address: 'placa catalunya, barcelona',
    formatted_address: 'Catalonia Square, Plaça de Catalunya, 08001 Barcelona, Spain'
}
*/

function MapView(props) {
    const [places, setPlaces] = useState([]);
    // const [shops, setShops] = useState([]);
    const [distanceArray, setDistanceArray] = useState([]);
   
    // calculate distance between each shop and current lcoation(use home, latitud ) and create array
    
    // sort array(ascendent by default)
    // reverse array

    useEffect(() => {
        getShops();
    }, []);

    // Get All shops
    async function getShops() {
    
        try {

        let response = await fetch(`/api/shops`);

        if (response.ok) {
            let shops = await response.json();
            console.log(shops)
            // setShops(shops);
            addMarkerForShops(shops)
        } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
        }
    } catch (err) {
        console.log(`Server error: ${err.message}`);
    }
    }

    
    async function addMarkerForShops(shops) {
        if (places.length === 0) {
            const newPlaces = [];
            for (let shop of shops) {
                let shops_address = shop.location_address;
                let myresponse = await geocode(shops_address);
                if (myresponse.ok) {
                    if (myresponse.data.latLng) {
                        let d = myresponse.data;
                        let newPlace = {
                            latLng: d.latLng,
                            input_address: shops_address,
                            formatted_address: d.formatted_address,
                        };
                        newPlaces.push(newPlace);
                    } else {
                        console.log('addMarkerForAddress(): no results found');
                    }
                } else {
                    console.log('addMarkerForAddress(): response.error:', myresponse.error);
                }
            }

            // Update the state with the new places
            setPlaces([...places, ...newPlaces]);

            // Calculate distances after updating places
            getDistance(newPlaces);
        } else {
            console.log('markers already loaded');
        }
    }

    function getDistance(newPlaces) {
        const newDistanceArray = [];
        for (let place of newPlaces) {
            let lat1 = props.home[0];
            let lon1 = props.home[1];
            let lat2 = place.latLng[0];
            let lon2 = place.latLng[1];

            // The radius of the Earth in kilometers
            const earthRadius = 6371;

            // Convert latitude and longitude from degrees to radians
            const radLat1 = toRadians(lat1);
            const radLon1 = toRadians(lon1);
            const radLat2 = toRadians(lat2);
            const radLon2 = toRadians(lon2);

            // Calculate the change in coordinates
            const deltaLat = radLat2 - radLat1;
            const deltaLon = radLon2 - radLon1;

            // Haversine formula to calculate the distance
            const a = Math.sin(deltaLat / 2) ** 2 + Math.cos(radLat1) * Math.cos(radLat2) * Math.sin(deltaLon / 2) ** 2;
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

            // Distance in kilometers
            const distance = earthRadius * c;

            newDistanceArray.push(distance);
        }

        

        // Sort and reverse the distance array
        const sortedDistanceArray = newDistanceArray.sort((a, b) => a - b).reverse();

        // Update distance array after sorting and reversing
        // setDistanceArray(sortedDistanceArray);
        setDistanceArray([...distanceArray, ...sortedDistanceArray]);
        
        // Update distance array after calculating distances
        // setDistanceArray([...distanceArray, ...newDistanceArray]);
    }

    function toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    useEffect(() => {
        console.log('distanceArray', distanceArray);
    }, [distanceArray]);

    console.log('distanceArray', distanceArray);
    let searchBydistance = [...distanceArray]
    searchBydistance.sort()
    searchBydistance.reverse()
    console.log('searchBydistance', searchBydistance);
    return (
        <div className="Demo1View">
            <div className="row mb-5">
      
                <div className="col">
                    {props.home && <MarkerMap places={places} home={props.home} zoom={13} />}
                </div>
            </div>
            {/* <div>
                {places.map(place =>(
                    <div>
                        <p key={1}>{place.latLng[0]}</p>
                        <p>{place.latLng[1]}</p>
                    </div>
                    ) )}
                
            </div> */}

            <MarkerTable places={places} />
        </div>
    );
}

export default MapView;