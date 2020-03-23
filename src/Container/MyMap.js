import React, { useEffect, useCallback, useState } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import GoogleMapReact from 'google-map-react';

import { dispatchReceiveLocation } from '../Redux/Action/Location';
import { dispatchReceiveCname } from '../Redux/Action/Shopes';
import Marker from './Marker';
import SearchBox from './SearchBox';
import MapMethod from '../Class/MapMethod';

const DEFAULT_DISTANCE = 5000;

export default function MyMap() {
  const mapState = useCallback(
    state => ({
      location: state.location.list,
      shopes: state.shopes.list,
      distance: state.selectedOption.distance,
      mask: state.selectedOption.mask
    }), []);
  const { location, shopes, distance, mask } = useMappedState(mapState);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dispatchReceiveLocation());
    dispatch(dispatchReceiveCname());
  },[]);

  const [maps, setMaps] = useState({});
  function setGoogleMaps (map, maps) {
    setMaps({
      mapInstance: map,
      mapApi: maps,
    });
  }

  const [places, setPlaces] = useState({lat:0, lng:0});
  function addPlace (place) {
    setPlaces({ lat: place[0].geometry.location.lat(), lng: place[0].geometry.location.lng() });
  }

  function onInfoClick (key) {
    const index = shopes.findIndex(e => e.properties.id === key);
    shopes[index].show = !shopes[index].show;
  }

  const isLoading = ((location.length === 0) || 
    (shopes.length === 0));
  
  const originLocation = { lat: location.lat, lng: location.lng };
  const currentLocation = places.lat === 0 ? originLocation : places;
  const currentDistance = distance.info === 0 ? DEFAULT_DISTANCE : distance.info * 1000;

  function filterShopes () {
    if (mask.info === 'child') {
      return shopes.filter(shope => shope.properties.mask_child > 0);
    }
    if (mask.info === 'adult') {
      return shopes.filter(shope => shope.properties.mask_adult > 0);
    }
    return shopes
  }

  return (
    <div className="main-map">
      <SearchBox map={maps.mapInstance} mapApi={maps.mapApi} addPlace={addPlace}/>
      {isLoading ? (<p>Loading.....</p>) : (
        <>
        <GoogleMapReact
            bootstrapURLKeys={{ 
              key: `${process.env.REACT_APP_GOOGLE_KEY}`,  
              libraries: ['places', 'geometry'],
            }}
            defaultCenter={originLocation}
            defaultZoom={15}
            yesIWantToUseGoogleMapApiInternals
            onGoogleApiLoaded={({ map, maps }) => {setGoogleMaps(map, maps)}}
            onChildClick={onInfoClick}
          >
          {MapMethod.generateNearbyShop(currentLocation, filterShopes(), currentDistance).map(shop => (
            <Marker
              key={shop.properties.id}
              lat={shop.geometry.coordinates[1]}
              lng={shop.geometry.coordinates[0]}
              place={shop}
            />
          ))}
        </GoogleMapReact>
        </>
      )}
    </div> 
  );
}
