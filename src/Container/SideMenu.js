import React from "react";
import { useDispatch } from "redux-react-hook";
import { Menu, Dropdown, Icon, Input } from "antd";

import {
  receiveSelectedDistance,
  receiveSelectedMask,
} from "../Redux/Action/SeletedOption";
import MapMethod from "../Class/MapMethod";
import SelectData from "../Class/SelectData";
import SearchBox from "./SearchBox";
import BusinessTime from "./BusinessTime";

const { Search } = Input;

export default function SideMenu(props) {
  const dispatch = useDispatch();

  const onSelectClick = (e) => {
    const type = e.domEvent.currentTarget.getAttribute("data-type");
    const info = e.domEvent.currentTarget.getAttribute("data-info");
    const text = e.domEvent.currentTarget.getAttribute("data-text");
    if (type === "distance") {
      const distance = {
        text,
        info: parseInt(info),
      };
      dispatch(receiveSelectedDistance(distance));
    }
    if (type === "mask") {
      const mask = {
        text,
        info,
      };
      dispatch(receiveSelectedMask(mask));
    }
  };

  function gererateDropMenu(list) {
    return (
      <Menu>
        {list.map((item, index) => (
          <Menu.Item
            key={index}
            onClick={onSelectClick}
            data-type={item.type}
            data-info={item.info}
            data-text={item.text}
          >
            {item.text}
          </Menu.Item>
        ))}
      </Menu>
    );
  }

  const filteredShopes = MapMethod.generateNearbyShop(
    props.currentLocation,
    props.getClassifiedShopes(),
    props.currentDistance
  );

  return (
    <div className="side-search">
      <div className="filter-type">
        <div className="search-main">
          <SearchBox
            map={props.maps.mapInstance}
            mapApi={props.maps.mapApi}
            addPlace={props.addPlace}
          />
          <Search style={{ width: 200 }} className="search-main-style" />
        </div>
        <Dropdown
          overlay={gererateDropMenu(SelectData.distance)}
          trigger={["click"]}
          className="select-main-style"
        >
          <button className="ant-dropdown-link" href="#">
            {props.distance.text}
            <Icon type="caret-down" />
          </button>
        </Dropdown>
        <Dropdown
          overlay={gererateDropMenu(SelectData.mask)}
          trigger={["click"]}
          className="select-main-style"
        >
          <button className="ant-dropdown-link" href="#">
            {props.mask.text}
            <Icon type="caret-down" />
          </button>
        </Dropdown>
      </div>
      <ul className="shop-info">
        {filteredShopes.length === 0 ? (
          <p>附近無藥局</p>
        ) : (
          filteredShopes.map((shop) => (
            <li key={shop.properties.id}>
              <span className="distance">
                {MapMethod.calculateDistance(
                  props.currentLocation,
                  shop.geometry.coordinates
                )}
                公尺
              </span>
              <p className="title">{shop.properties.name}</p>
              <span className="address">{shop.properties.address}</span>
              <span className="phone">{shop.properties.phone}</span>
              <div className="note">{shop.properties.note}</div>
              <div className="business-hours">
                <BusinessTime timeList={shop.properties.available} />
              </div>
              <div className="quantity-display">
                <div className="adult">
                  成人口罩 <strong>{shop.properties.mask_adult}</strong>
                </div>
                <div className="child">
                  兒童口罩 <strong>{shop.properties.mask_child}</strong>
                </div>
              </div>
              <div className="update-time">
                更新時間 {shop.properties.updated}
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
