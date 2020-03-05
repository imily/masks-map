import React, { useState, useEffect, useCallback } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import mapStyle from "../Data/mapStyle";

import { dispatchReceiveLocation } from '../Redux/Action/Location';
import { dispatchReceiveCname } from '../Redux/Action/Shopes';

const MapWrapped = withScriptjs(withGoogleMap(Map));

export function Map () {
  const [selectPark, setSelectPark] = useState(null);

  const mapState = useCallback(
    state => ({
      loaction: state.location.list,
      shopes: state.shopes.list
    }), []);
  const { loaction, shopes } = useMappedState(mapState);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(dispatchReceiveLocation());
    dispatch(dispatchReceiveCname());
  },[]);

  const isLoading = ((loaction.length === 0) || (shopes.length === 0));
  return (
    <>
    {isLoading ? (<p>Loading.....</p>) : (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: loaction[0], lng: loaction[1] }}
        // defaultOptions={{styles: mapStyle}}
      >
        {shopes.map((park, index) => (
          <Marker
            key={ park.properties.id }
            position={{ 
              lat: park.geometry.coordinates[1],
              lng: park.geometry.coordinates[0] }}
            onClick={() => {
              setSelectPark(park);
            }}
            icon={{
              url: '/skateboarding.svg',
              scaledSize: new window.google.maps.Size(25, 25) 
            }}
          />
        ))
        }
        {selectPark && (
          <InfoWindow
            position={{ 
              lat: selectPark.geometry.coordinates[1],
              lng: selectPark.geometry.coordinates[0] }}
            onCloseClick={() => {
              setSelectPark(null);
            }}
          >
            <div>
              <h2>{selectPark.properties.name}</h2>
              <p>{selectPark.properties.DESCRIPTIO}</p>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    )}
    </>
  );
}

export default function MyMap() {
  return (
    <div className="main-map">
      <MapWrapped
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${
          process.env.REACT_APP_GOOGLE_KEY}`}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div> 
  );
}
