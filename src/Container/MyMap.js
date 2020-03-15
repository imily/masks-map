import React, { useEffect, useCallback, useState } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import GoogleMapReact from 'google-map-react';

import { dispatchReceiveLocation } from '../Redux/Action/Location';
import { dispatchReceiveCname } from '../Redux/Action/Shopes';
import Marker from './Marker';
import SearchBox from './SearchBox';

const DEFAULT_DISTANCE = 5000;

export default function MyMap() {
  const mapState = useCallback(
    state => ({
      location: state.location.list,
      shopes: state.shopes.list
    }), []);
  const { location, shopes } = useMappedState(mapState);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dispatchReceiveLocation());
    dispatch(dispatchReceiveCname());
  },[]);

  function calculateDistance(pointA, pointB) {
    // http://www.movable-type.co.uk/scripts/latlong.html
    const lat1 = pointA.lat;
    const lon1 = pointA.lng;
  
    const lat2 = pointB[1];
    const lon2 = pointB[0];
  
    const R = 6371e3; // earth radius in meters
    const φ1 = lat1 * (Math.PI / 180);
    const φ2 = lat2 * (Math.PI / 180);
    const Δφ = (lat2 - lat1) * (Math.PI / 180);
    const Δλ = (lon2 - lon1) * (Math.PI / 180);
  
    const a = (Math.sin(Δφ / 2) * Math.sin(Δφ / 2)) +
              ((Math.cos(φ1) * Math.cos(φ2)) * (Math.sin(Δλ / 2) * Math.sin(Δλ / 2)));
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  
    const distance = R * c;
    return Math.round(distance); // in meters
  }
  
  function generateNearbyShop(userLocation, shopes, distance){
    const list = [];
    for (let i = 0; i < shopes.length; i ++) {
      if (calculateDistance(userLocation, shopes[i].geometry.coordinates) <= distance) {
        list.push(shopes[i]);
      };
    }
    return list;
  }

  const [maps, setMaps] = useState({});
  function setGoogleMaps (map, maps) {
    setMaps({
      mapInstance: map,
      mapApi: maps,
    });
  }

  const [places, setPlaces] = useState({});
  function addPlace (place) {
    setPlaces({ places: place });
  }

  const isLoading = ((location.length === 0) || 
    (shopes.length === 0));

  return (
    <div className="main-map">
      <SearchBox map={maps.mapInstance} mapApi={maps.mapApi} addPlace={addPlace}/>
      {isLoading ? (<p>Loading.....</p>) : (
        <GoogleMapReact
            bootstrapURLKeys={{ 
              key: `${process.env.REACT_APP_GOOGLE_KEY}`,  
              libraries: ['places', 'geometry'],
            }}
            defaultCenter={{ lat: location.lat, lng: location.lng }}
            defaultZoom={15}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {setGoogleMaps(map, maps)}}
          >
          {generateNearbyShop(location, shopes, DEFAULT_DISTANCE).map(shop => (
            <Marker
              key={shop.properties.id}
              lat={shop.geometry.coordinates[1]}
              lng={shop.geometry.coordinates[0]}
            />
          ))}
        </GoogleMapReact>
      )}
    </div> 
  );
}
