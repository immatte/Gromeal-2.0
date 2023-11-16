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
    const [shops, setShops] = useState([]);


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
            setShops(shops);
            addMarkerForShops(shops)
        } else {
            console.log(`Server error: ${response.status} ${response.statusText}`);
        }
    } catch (err) {
        console.log(`Server error: ${err.message}`);
    }
    }

    let shops_address = []
    // console.log(shops[0].location_address)
    async function addMarkerForShops(shops) {

        for(let shop of shops){
            shops_address = shop.location_address
            let myresponse = await geocode(shops_address);
            if (myresponse.ok) {
                if (myresponse.data.latLng) {
                    // Create new 'place' obj
                    let d = myresponse.data;
                    let newPlace = { 
                        latLng: d.latLng,
                        input_address: shops_address,
                        formatted_address: d.formatted_address
                    };
                    // Add it to 'places' state
                    setPlaces(places => [...places, newPlace]);
                } else {
                    console.log('addMarkerForAddress(): no results found');
                }
            } else {
                console.log('addMarkerForAddress(): response.error:', myresponse.error);
            }
        }
        console.log(shops_address)
        
        // Send a request to OpenCage to geocode 'addr'
    }

    async function addMarkerForAddress(addr) {

        
        // Send a request to OpenCage to geocode 'addr'
        console.log(addr)
        let myresponse = await geocode(addr);
        if (myresponse.ok) {
            if (myresponse.data.latLng) {
                // Create new 'place' obj
                let d = myresponse.data;
                let newPlace = { 
                    latLng: d.latLng,
                    input_address: addr,
                    formatted_address: d.formatted_address
                };
                // Add it to 'places' state
                setPlaces(places => [...places, newPlace]);
            } else {
                console.log('addMarkerForAddress(): no results found');
            }
        } else {
            console.log('addMarkerForAddress(): response.error:', myresponse.error);
        }
    }

    return (
        <div className="Demo1View">
            <div className="row mb-5">
                {/* <div className="col">
                    <h3>1. Set Home</h3>
                    <p>The map will be centered and the "home" (green) marker will be determined by one of these:</p>
                    <ol>
                        <li>A <code>home</code> query parameter like: <code>http://localhost:3000?home=oslo</code></li>
                        <li>Allow the browser to determine your current location</li>
                        <li>Use Plaça Catalunya in Barcelona as a last resort</li>
                    </ol>

                    <h3 className="mt-4">2. Add Markers</h3>
                    <p>Enter an address to add a blue marker on the map</p>
                    <AddressForm addMarkerCb={addr => addMarkerForAddress(addr)} />
                </div> */}

                <div className="col">
                    {props.home && <MarkerMap places={places} home={props.home} zoom={13} />}
                </div>
            </div>

            <MarkerTable places={places} />
        </div>
    );
}

export default MapView;