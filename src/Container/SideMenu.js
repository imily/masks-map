import React from 'react';
import { useDispatch } from 'redux-react-hook';
import { Menu, Dropdown, Icon, Input } from 'antd';
import {
  dispatchReceiveSelectedDistance,
  dispatchReceiveSelectedMask
} from '../Redux/Action/SeletedOption';
import MapMethod from '../Class/MapMethod';
import SelectData from '../Class/SelectData';
import SearchBox from './SearchBox';

const { Search } = Input;

export default function SideMenu (props) {
    const dispatch = useDispatch();

    function gererateBusinessHours(text) {
      return text.split('、');
    }

    const onClick = (e) => {
      const type = e.domEvent.currentTarget.getAttribute('data-type');
      const info = e.domEvent.currentTarget.getAttribute('data-info');
      const text = e.domEvent.currentTarget.getAttribute('data-text');
      if (type === 'distance') {
        const distance = {
          text,
          info: parseInt(info),
        };
        dispatch(dispatchReceiveSelectedDistance(distance));
      }
      if (type === 'mask') {
        const mask = {
          text,
          info,
        };
        dispatch(dispatchReceiveSelectedMask(mask));
      }
    };
    
    function gererateDropMenu(list) {
      const menu = list.map((item, index) => 
        <Menu.Item
          key={index}
          onClick={onClick}
          data-type={item.type}
          data-info={item.info}
          data-text={item.text}
        >
          {item.text}
        </Menu.Item>
      );
      return (
        <Menu>
          {menu}
        </Menu>
      );
    }

    const maskSelectorText = SelectData.mask.forEach(item => item.info === props.mask.info) ? props.mask.text : '口罩種類';
    const isLoading = Object.keys(props.maps).length === 0;

    return (
      <div className="side-search">
          <div className="filter-type">
            <div className="search-main">
              {isLoading ? 
                '載入中' : 
                <SearchBox
                  map={props.maps.mapInstance}
                  mapApi={props.maps.mapApi}
                  addPlace={props.addPlace}
              />}
              <Search
                onSearch={value => console.log(value)}
                style={{ width: 200 }}
                className="search-main-style"
              />
            </div>
            <Dropdown
              overlay={gererateDropMenu(SelectData.distance)}
              trigger={['click']} className="select-main-style"
            >
              <button className="ant-dropdown-link" href="#">
                {props.distance.text}
                <Icon type="caret-down" />
              </button>
            </Dropdown>
            <Dropdown
              overlay={gererateDropMenu(SelectData.mask)}
              trigger={['click']} className="select-main-style"
            >
              <button className="ant-dropdown-link" href="#">
                {maskSelectorText}
                <Icon type="caret-down" />
              </button>
            </Dropdown>
            {/* <Dropdown
              overlay={gererateDropMenu(gererateBusinessHours(props.shopes[0].properties.available))}
              trigger={['click']} className="select-main-style"
            >
              <button className="ant-dropdown-link">
                營業時間<Icon type="caret-down" />
              </button>
            </Dropdown> */}
            <button className="mark-button">
              <Icon type="star" />
            </button>
          </div>
          <ul className="shop-info">
            {MapMethod.generateNearbyShop(props.currentLocation, props.filterShopes(), props.currentDistance).length === 0 ? (<p>附近無藥局</p>) :
              (MapMethod.generateNearbyShop(props.currentLocation, props.filterShopes(), props.currentDistance).map(shop => (
              <li key={shop.properties.id}>
                <button className="mark-button">
                  <Icon type="star" />
                </button>
                <span className="distance">{MapMethod.calculateDistance(props.location, shop.geometry.coordinates)}公尺</span>
                <p className="title">{shop.properties.name}</p>
                <span className="address">{shop.properties.address}</span>
                <span className="phone">{shop.properties.phone}</span>
                <div className="business-hours">
                  營業時間
                  <Dropdown
                    overlay={gererateDropMenu(gererateBusinessHours(shop.properties.available))}
                    trigger={['click']} className="select-sub-style"
                  >
                    <button className="ant-dropdown-link">
                      查看<Icon type="caret-down" />
                    </button>
                  </Dropdown>
                </div>
                <div className="quantity-display">
                  <div className="adult">成人口罩 <strong>{shop.properties.mask_adult}</strong></div>
                  <div className="child">兒童口罩 <strong>{shop.properties.mask_child}</strong></div>
                </div>
                <div className="update-time">更新時間 {shop.properties.updated}</div>
              </li>)
            ))}
          </ul>
      </div>
    )
}
