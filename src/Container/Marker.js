import React from 'react';
import InfoWindow from './InfoWindow';

export default function Marker(props) {
    return (
        <div>
            <div className="pin bounce"/>
            <div className="pulse" />
            <InfoWindow place={props.place}/>
        </div>
    );
}
