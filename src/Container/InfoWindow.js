import React from 'react';
import BusinessTime from './BusinessTime';

export default function InfoWindow(props) {
    const isShow = props.place.show;
    const note = props.place.properties.note;

    return (
      <>
      {isShow? 
      <div className="info-window clear-fix">
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
              <span>更新時間</span>
              {props.place.properties.updated}
            </div>
            <div className="note">
              {note}
            </div>
        </div>
        <div className="col available">
          <BusinessTime timeList={props.place.properties.available}/>
        </div>
      </div> : null
      }
    </>
  );
}
