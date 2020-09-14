import React from "react";
import GoogleMapReact from "google-map-react";

import Marker from "./Marker";
import MapMethod from "../Class/MapMethod";

export default function MyMap(props) {
  function onInfoClick(key) {
    const index = props.shopes.findIndex((e) => e.properties.id === key);
    props.shopes[index].show = !props.shopes[index].show;
  }

  const filteredShopes = MapMethod.generateNearbyShop(
    props.currentLocation,
    props.filterShopes(),
    props.currentDistance
  );

  return (
    <div className="main-map">
      <GoogleMapReact
        bootstrapURLKeys={{
          key: `${process.env.REACT_APP_GOOGLE_KEY}`,
          libraries: ["places", "geometry"],
        }}
        defaultCenter={props.originLocation}
        defaultZoom={15}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => {
          props.setGoogleMaps(map, maps);
        }}
        onChildClick={onInfoClick}
      >
        {filteredShopes.map((shop) => (
          <Marker
            key={shop.properties.id}
            lat={shop.geometry.coordinates[1]}
            lng={shop.geometry.coordinates[0]}
            place={shop}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
}
