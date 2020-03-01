import React, { useState, useEffect } from 'react';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";
import axios from 'axios';
import mapStyle from "../Data/mapStyle";

const MapWrapped = withScriptjs(withGoogleMap(Map));

function initMap () {
  return new Promise((res, rej) => {
    navigator.geolocation.watchPosition(position => {
      res([position.coords.latitude, position.coords.longitude]);
    });
  });
}

export function Map () {
  const [selectPark, setSelectPark] = useState(null);
  
  const [defaultShop, setDefaultShop] = useState(null);
  useEffect(() => {
    const url = 'https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json';
    const fetchData = async () => {
      const result = await axios(url);
      setDefaultShop(result.data.features);
    };
    fetchData();
  },[]);

  const [defalutMap, setDefalutMap] = useState(null);
  useEffect(() => {
    const getMapData = async () => {
      let result = null;
      await initMap().then(json => {
        result = json;
        setDefalutMap(result);
      });
    };

    getMapData();
  },[]);
  return (
    <>
    {(defaultShop === null || !defalutMap) ? (<p>Loading.....</p>) : (
      <GoogleMap
        defaultZoom={15}
        defaultCenter={{ lat: defalutMap[0], lng: defalutMap[1] }}
        // defaultOptions={{styles: mapStyle}}
      >
        {//console.log(defalutMap, defaultShop)
        defaultShop.map((park, index) => (
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
