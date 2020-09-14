import React, { useEffect, useState } from "react";
import { useMappedState, useDispatch } from "redux-react-hook";
import { Spin } from "antd";

import { receiveUserLocation } from "../Redux/Action/Location";
import { receiveShopes } from "../Redux/Action/Shopes";

import SideMenu from "./SideMenu";
import MyMap from "./MyMap";
import MapMethod from "../Class/MapMethod";

const DEFAULT_DISTANCE = 1000;

export default function MaskMap() {
  const dispatch = useDispatch();

  const { location, shopes, distance, mask } = useMappedState((state) => ({
    location: state.location.list,
    shopes: state.shopes.list,
    distance: state.selectedOption.distance,
    mask: state.selectedOption.mask,
  }));

  const [isLoading, setIsLoading] = useState(true);
  async function fetchData() {
    await dispatch(receiveUserLocation());
    await dispatch(receiveShopes());
    setIsLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const [maps, setMaps] = useState({});

  function setGoogleMaps(map, maps) {
    setMaps({
      mapInstance: map,
      mapApi: maps,
    });
  }

  const [places, setPlaces] = useState({ lat: 0, lng: 0 });
  function addPlace(place) {
    setPlaces({
      lat: place[0].geometry.location.lat(),
      lng: place[0].geometry.location.lng(),
    });
  }

  const originLocation = { lat: location.lat, lng: location.lng };
  const currentLocation = places.lat === 0 ? originLocation : places;
  const currentDistance =
    distance.info === 0 ? DEFAULT_DISTANCE : distance.info * 1000;

  function getClassifiedShopes() {
    if (mask.info === "child") {
      return shopes.filter((shope) => shope.properties.mask_child > 0);
    }
    if (mask.info === "adult") {
      return shopes.filter((shope) => shope.properties.mask_adult > 0);
    }
    return shopes;
  }

  return (
    <div className="container">
      {isLoading ? (
        <Spin size="large" />
      ) : (
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
            getClassifiedShopes={getClassifiedShopes}
          />
          <MyMap
            setGoogleMaps={setGoogleMaps}
            shopes={MapMethod.generateNearbyShop(
              currentLocation,
              shopes,
              currentDistance
            )}
            originLocation={originLocation}
            currentLocation={currentLocation}
            currentDistance={currentDistance}
            filterShopes={getClassifiedShopes}
          />
        </>
      )}
    </div>
  );
}
