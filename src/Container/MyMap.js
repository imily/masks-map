import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useMappedState, useDispatch } from 'redux-react-hook';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import mapStyle from "../Data/mapStyle";
import { StandaloneSearchBox } from 'react-google-maps/lib/components/places/StandaloneSearchBox';

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

  // google search
  const refs = {};
  const onSearchBoxMounted = ref => {
    refs.searchBox = ref;
  }
  const [places, setPlace] = useState(null);
  const onPlacesChanged = () => {
    const data = refs.searchBox.getPlaces();
    setPlace(data);
    const bounds = new window.google.LatLngBounds();
    data.forEach(place => {
      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport)
      } else {
        bounds.extend(place.geometry.location)
      }
    });
    const nextMarkers = data.map(place => ({
      position: place.geometry.location,
    }));
    console.log(nextMarkers);
  }
  const onMapMounted = ref => {
    refs.map = ref;
  }
  const [bounds, setBounds] = useState(null);
  const onBoundsChanged = () => {
    const data = {
      bounds: refs.map.getBounds(),
      center: refs.map.getCenter()
    };
    setBounds(data);
  }
  // google search end

  const isLoading = ((loaction.length === 0) || (shopes.length === 0));
  return (
    <>
    {isLoading ? (<p>Loading.....</p>) : (
      <GoogleMap
        ref={onMapMounted}
        onBoundsChanged={onBoundsChanged}
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
        {/* {!places ? null: (
          <ol>
            {places.map(
              ({ place_id, formatted_address, geometry: { location } }) => {
                return <li key={place_id}>
                  {formatted_address}
                  {" at "}({location.lat()}, {location.lng()})
                </li>
              }
            )}
          </ol>
        )} */}
        {console.log(bounds)}
        <StandaloneSearchBox 
            ref={onSearchBoxMounted}
            // bounds={bounds}
            onPlacesChanged={onPlacesChanged}
          >
          <input
            type="text"
            placeholder="Customized your placeholder"
            style={{
              boxSizing: `border-box`,
              border: `1px solid transparent`,
              width: `240px`,
              height: `32px`,
              padding: `0 12px`,
              borderRadius: `3px`,
              boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
              fontSize: `14px`,
              outline: `none`,
              textOverflow: `ellipses`,
              position: 'absolute',
              top: 0,
              right: 0
            }}
          />
        </StandaloneSearchBox>
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
