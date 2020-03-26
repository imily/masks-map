import React from 'react';
import Common from '../Class/Common';

export default function InfoWindow(props) {
    const isShow = props.place.show;
    const infoWindowStyle = {
        display: isShow ? 'block' : 'none'
    }
    const timeList = Common.gererateBusinessHours(props.place.properties.available);
    return (
        <div style={infoWindowStyle} className="info-window clear-fix">
            <div className="col text">
                <h3 className="name">
                    {props.place.properties.name}
                </h3>
                <p className="address">
                    {props.place.properties.address}
                </p>
                <p className="address">
                    {props.place.properties.phone}
                </p>
                <div className="mask-type">
                    <div className="adult">
                        <b>成人口罩</b>
                        {props.place.properties.mask_adult}
                    </div>
                    <div className="child">
                        <b>兒童口罩</b>
                        {props.place.properties.mask_child}
                    </div>
                </div>
                <div className="updated">
                    {props.place.properties.updated}
                </div>
            </div>
            <div className="col available">
                <b>營業時間</b>
                <ul>
                    {timeList.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}
