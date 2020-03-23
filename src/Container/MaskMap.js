import React, { useEffect, useCallback, useState } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';

import { dispatchReceiveLocation } from '../Redux/Action/Location';
import { dispatchReceiveCname } from '../Redux/Action/Shopes';

import SideMenu from './SideMenu';
import MyMap from './MyMap';

const DEFAULT_DISTANCE = 5000;

export default function MaskMap() {
  const [maps, setMaps] = useState({});
  function setGoogleMaps (map, maps) {
    setMaps({
      mapInstance: map,
      mapApi: maps,
    });
	}
	
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
	

  const [places, setPlaces] = useState({lat:0, lng:0});
  function addPlace (place) {
    setPlaces({ lat: place[0].geometry.location.lat(), lng: place[0].geometry.location.lng() });
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
    <div className="container">
			{isLoading ? (<p>Loading.....</p>) : (
				<>
					<SideMenu
						maps={maps}
						mask={mask}
						shopes={shopes}
						distance={distance}
						location={location}
						addPlace={addPlace}
						currentLocation={currentLocation}
						currentDistance={currentDistance}
						filterShopes={filterShopes}
					/>
					<MyMap
						setGoogleMaps={setGoogleMaps}
						shopes={shopes}
						originLocation={originLocation}
						currentLocation={currentLocation}
						currentDistance={currentDistance}
						filterShopes={filterShopes}
					/>
				</>
				)
			}
    </div>
  );
}
