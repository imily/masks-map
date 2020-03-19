import React from 'react';

export default function InfoWindow(props) {
    const isShow = props.place.show;
    const infoWindowStyle = {
        position: 'absolute',
        width: 220,
        fontSize: 14,
        zIndex: 100,
        background: '#000',
        color: '#fff',
        display: isShow ? 'block' : 'none'
    }
    return (
        <div style={infoWindowStyle}>
            <div>
                {props.place.properties.name}
            </div>
        </div>
    );
}
